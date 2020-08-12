using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using SSIS.Models;
using SSIS.Services;

namespace SSIS.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DeptStaffController : ControllerBase
    {
        private readonly IDeptStaffService _deptStaffService;

        public DeptStaffController(IDeptStaffService deptStaffService)
        {
            _deptStaffService = deptStaffService;
        }

        [HttpPost("")]
        public IActionResult UpdateDeptRep([FromBody] DeptStaff deptstaff)
        {
            return Ok(_deptStaffService.UpdateDeptRep(deptstaff).Result);
        }
    }
}
