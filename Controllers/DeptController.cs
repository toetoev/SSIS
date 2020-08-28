using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using SSIS.IService;
using SSIS.Models;

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

        [HttpGet("all")]
        [Authorize(Roles = StoreRole.All)]
        public IActionResult GetAllDepartment()
        {
            return Ok(_deptService.GetAllDepartment().Result);
        }

        [HttpPost("")]
        [Authorize(Roles = DeptRole.DeptHead)]
        public IActionResult UpdateCollectionPoint([FromBody] string collectionPoint)
        {
            string currentUser = User.FindFirst(ClaimTypes.Email).Value;
            return Ok(_deptService.UpdateCollectionPoint(currentUser, collectionPoint).Result);
        }
    }
}