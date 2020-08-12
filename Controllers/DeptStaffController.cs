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

        [HttpPost("")]
        public IActionResult UpdateDepartmentRepresentative([FromBody] DeptStaff deptStaff)
        {
            return Ok(_deptStaffService.UpdateDeptRep(deptStaff).Result);
        }
    }
}
