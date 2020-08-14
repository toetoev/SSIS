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

        [HttpGet("{deptName}")]
        public IActionResult GetCollectionPoint([FromRoute] string deptName)
        {
            return Ok(_deptService.GetCollectionPoint(deptName).Result);
        }

        [HttpPost("")]
        public IActionResult UpdateCollectionPoint([FromBody] Department department)
        {
            return Ok(_deptService.UpdateCollectionPoint(department).Result);
        }
    }
}