using System;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using SSIS.Models;
using SSIS.Payloads;
using SSIS.Repositories;

namespace SSIS.Services
{
    public class AuthService : IAuthService
    {
        private readonly IAuthRepository _authRepository;
        private readonly IConfiguration _config;

        public AuthService(IAuthRepository authRepository, IConfiguration config)
        {
            _authRepository = authRepository;
            _config = config;
        }

        public async Task<string> Login(User user)
        {
            var nameOrEmail = user.Name == null ? user.Email : user.Name;
            var userFromRepo = await _authRepository.Login(nameOrEmail, user.Password);
            if (userFromRepo == null)
                return null;

            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(_config.GetSection("AppSettings:JWTSecret").Value);
            System.Console.WriteLine(userFromRepo.ToString());
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new Claim[]{
                    new Claim(ClaimTypes.Email, userFromRepo.Email),
                    new Claim(ClaimTypes.Name, userFromRepo.Name),
                    new Claim(ClaimTypes.Role, userFromRepo.Role)
                }),
                Expires = DateTime.Now.AddDays(1),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha512Signature)
            };

            var token = tokenHandler.CreateToken(tokenDescriptor);
            var tokenString = tokenHandler.WriteToken(token);

            return tokenString;
        }

        public async Task<ApiResponse> Register(User user)
        {
            if (await _authRepository.UserExists(user.Name))
                return new ApiResponse { Success = false, Message = "Name is already taken" };

            var createUser = await _authRepository.Register(user, user.Password);
            return new ApiResponse { Success = true };
        }
    }
}