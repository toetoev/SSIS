using System;
using System.IdentityModel.Tokens.Jwt;
using System.Net;
using System.Security.AccessControl;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using SSIS.Models;
using SSIS.Payloads;
using SSIS.Repositories;
using SSIS.Services;

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
            return Ok(new { _authService.Login(user).Result });
        }

        // [Authorize(Roles = StoreRole.Clerk)]
        [HttpGet]
        public int Get()
        {
            // System.Console.WriteLine("get");
            // System.Console.WriteLine(_config["AppSettings:JWTSecret"]);
            return 2;
        }
    }
}