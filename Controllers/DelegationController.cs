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
        [Authorize(Roles = DeptRole.DeptHead + "," + DeptRole.Employee)]
        public IActionResult GetDelegation()
        {
            string deptStaffEmail = User.FindFirst(ClaimTypes.Email).Value;
            return Ok(_delegationService.GetDelegation(deptStaffEmail).Result);
        }

        [HttpPut("{delegationId}")]
        [Authorize(Roles = DeptRole.DeptHead)]
        public IActionResult UpdateDelegation([FromRoute] Guid delegationId, [FromBody] Delegation delegation)
        {
            string delegatedByEmail = User.FindFirst(ClaimTypes.Email).Value;
            return Ok(_delegationService.UpdateDelegation(delegation, delegationId, delegatedByEmail).Result);
        }

        [HttpDelete("{delegationId}")]
        [Authorize(Roles = DeptRole.DeptHead)]
        public IActionResult DeleteDelegation([FromRoute] Guid delegationId)
        {
            return Ok(_delegationService.DeleteDelegation(delegationId).Result);
        }
    }
}