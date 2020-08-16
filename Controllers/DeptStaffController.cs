using System;
using System.Linq;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using SSIS.Models;
using SSIS.Services;

namespace SSIS.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class DeptStaffController : ControllerBase
    {
        private readonly IDeptStaffService _deptStaffService;

        public DeptStaffController(IDeptStaffService deptStaffService)
        {
            _deptStaffService = deptStaffService;
        }

        // /?deptName=Computer%20Science&roles=DEPTREP&roles=EMPLOYEE
        [HttpGet("")]
        // TODO: authorized by dh
        public IActionResult GetDeptStaffByRole([FromQuery] string deptName, [FromQuery] string[] roles)
        {
            foreach (var role in roles)
            {
                if (!DeptRole.isDeptStaff(role))
                    return BadRequest();

            }
            return Ok(_deptStaffService.GetDeptStaffByDeptAndRole(deptName, roles).Result);
        }

        [HttpPost("")]
        [Authorize(Roles = DeptRole.DeptHead)]
        public IActionResult UpdateDeptRep([FromBody] string newRepEmail)
        {
            return Ok(_deptStaffService.UpdateDeptRep(newRepEmail).Result);
        }
    }
}