using System.Security.AccessControl;
using System.Net;
using System;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using Microsoft.AspNetCore.Authorization;
using SSIS.Models;
using SSIS.Repositories;

namespace SSIS.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly IAuthRepository _authRepository;
        private readonly IConfiguration _config;
        public AuthController(IAuthRepository authRepository, IConfiguration config)
        {
            _authRepository = authRepository;
            _config = config;
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] User user)
        {
            var nameOrEmail = user.Name == null ? user.Email : user.Name;
            var userFromRepo = await _authRepository.Login(nameOrEmail, user.Password);
            if (userFromRepo == null)
                return Unauthorized();

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

            return Ok(new { tokenString });
        }

        [HttpPost("register")] //<host>/api/auth/register
        public async Task<IActionResult> Register([FromBody] User user)
        { //Data Transfer Object containing Name and password.
          // validate request
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            if (await _authRepository.UserExists(user.Name))
                return BadRequest("Name is already taken");

            var createUser = await _authRepository.Register(user, user.Password);
            return StatusCode(201);
        }

        [Authorize(Roles = StoreRole.Clerk)]
        public int Get()
        {
            // System.Console.WriteLine("get");
            // System.Console.WriteLine(_config["AppSettings:JWTSecret"]);
            return 1;
        }
    }
}
