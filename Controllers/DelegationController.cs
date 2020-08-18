using System;
using System.Collections.Generic;
using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using SSIS.Models;
using SSIS.Services;

namespace SSIS.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class DelegationController : ControllerBase
    {
        private readonly IDelegationService _delegationService;
        public DelegationController(IDelegationService delegationService)
        {
            _delegationService = delegationService;
        }

        [HttpGet("")]
        public IActionResult GetAction()
        {
            string email = User.FindFirst(ClaimTypes.Email).Value;
            return Ok(_delegationService.GetDelegationByDeptHeadEmail(email).Result);
        }
    }
}