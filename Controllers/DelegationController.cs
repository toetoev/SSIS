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

        [HttpPost("")]
        public IActionResult CreateDelegation([FromBody] Delegation delegation)
        {
            string delegatedByEmail = User.FindFirst(ClaimTypes.Email).Value;
            return Ok(_delegationService.CreateDelegation(delegation, delegatedByEmail).Result);
        }

        [HttpGet("")]
        public IActionResult GetDelegationByDeptHeadEmail()
        {
            string email = User.FindFirst(ClaimTypes.Email).Value;
            return Ok(_delegationService.GetDelegationByDeptHeadEmail(email).Result);
        }

        [HttpPut("")]
        public IActionResult UpdateDelegation([FromBody] Delegation delegation)
        {
            string delegatedByEmail = User.FindFirst(ClaimTypes.Email).Value;
            return Ok(_delegationService.UpdateDelegation(delegation).Result);
        }

        [HttpDelete("{startDate}")]
        public IActionResult DeleteDelegation([FromRoute] DateTime startDate)
        {
            string delegatedByEmail = User.FindFirst(ClaimTypes.Email).Value;
            return Ok(_delegationService.DeleteDelegation(delegatedByEmail, startDate).Result);
        }
    }
}