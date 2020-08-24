using System;
using System.Collections.Generic;
using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using SSIS.IService;
using SSIS.Models;

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
        [Authorize(Roles = DeptRole.DeptHead)]
        public IActionResult CreateDelegation([FromBody] Delegation delegation)
        {
            string delegatedByEmail = User.FindFirst(ClaimTypes.Email).Value;
            return Ok(_delegationService.CreateDelegation(delegation, delegatedByEmail).Result);
        }

        [HttpGet("")]
        [Authorize(Roles = DeptRole.DeptHead)]
        public IActionResult GetDelegationByDeptHeadEmail()
        {
            string delegatedByEmail = User.FindFirst(ClaimTypes.Email).Value;
            return Ok(_delegationService.GetDelegation(delegatedByEmail).Result);
        }

        [HttpPut("")]
        [Authorize(Roles = DeptRole.DeptHead)]
        public IActionResult UpdateDelegation([FromBody] Delegation delegation)
        {
            string delegatedByEmail = User.FindFirst(ClaimTypes.Email).Value;
            return Ok(_delegationService.UpdateDelegation(delegation, delegatedByEmail).Result);
        }

        [HttpDelete("{startDate}")]
        [Authorize(Roles = DeptRole.DeptHead)]
        public IActionResult DeleteDelegation([FromRoute] DateTime startDate)
        {
            string delegatedByEmail = User.FindFirst(ClaimTypes.Email).Value;
            return Ok(_delegationService.DeleteDelegation(startDate, delegatedByEmail).Result);
        }
    }
}