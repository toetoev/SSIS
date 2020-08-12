using Microsoft.AspNetCore.Mvc;
using SSIS.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SSIS.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class RequisitionController : ControllerBase
    {
        [HttpPost("")]
        public IActionResult CreateReq([FromBody] Requisition req)
        {
            return null;
        }

        [HttpGet("")]
        public IActionResult RetrieveReq([FromBody] Requisition req)
        {
            return null;
        }

        [HttpPut("")]
        public IActionResult UpdateRep([FromBody] Requisition req)
        {
            return null;
        }

        [HttpDelete("")]
        public IActionResult DeleteReq([FromBody] Requisition req)
        {
            return null;
        }
    }
}
