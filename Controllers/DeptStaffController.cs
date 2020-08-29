using System;
using System.Linq;
using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using SSIS.IService;
using SSIS.Models;

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

        // /?roles=DEPTREP&roles=EMPLOYEE
        [HttpGet("")]
        [Authorize(Roles = DeptRole.DeptHead + "," + DeptRole.Employee)]
        public IActionResult GetDeptStaffByRole([FromQuery] string[] roles)
        {
            string email = User.FindFirst(ClaimTypes.Email).Value;
            foreach (var role in roles)
            {
                if (!DeptRole.isDeptStaff(role))
                    return BadRequest();

            }
            return Ok(_deptStaffService.GetDeptStaffByDeptAndRole(email, roles).Result);
        }

        [HttpPost("")]
        [Authorize(Roles = DeptRole.DeptHead)]
        public IActionResult UpdateDeptRep([FromBody] string newRepEmail)
        {
            return Ok(_deptStaffService.UpdateDeptRep(newRepEmail).Result);
        }
    }
}