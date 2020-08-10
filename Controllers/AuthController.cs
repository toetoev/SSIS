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
using SSIS.Services;
using SSIS.Payloads;

namespace SSIS.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly IAuthService _authService;
        public AuthController(IAuthService authService)
        {
            _authService = authService;
        }

        [HttpPost("login")]
        public IActionResult Login([FromBody] User user)
        {
            var token = _authService.Login(user);
            if (token == null)
                return Unauthorized();
            else
                return Ok(new { token });
        }

        [HttpPost("register")]
        public IActionResult Register([FromBody] User user)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);
            var result = _authService.Register(user).Result;
            if (result.Success)
                return StatusCode(201);
            else
                return BadRequest("Name is already taken");
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
