using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using SSIS.Models;
using SSIS.Services;

namespace SSIS.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class DeptController : ControllerBase
    {
        private readonly IDeptService _deptService;

        public DeptController(IDeptService deptService)
        {
            _deptService = deptService;
        }

        [HttpGet("")]
        [Authorize(Roles = DeptRole.All)]
        public IActionResult GetCollectionPoint()
        {
            string currentUser = User.FindFirst(ClaimTypes.Email).Value;
            return Ok(_deptService.GetCollectionPointByStaff(currentUser).Result);
        }

        [HttpPost("")]
        // [Authorize]
        // TODO: authorize by dh
        public IActionResult UpdateCollectionPoint([FromBody] Department department)
        {
            return Ok(_deptService.UpdateCollectionPoint(department).Result);
        }
    }
}