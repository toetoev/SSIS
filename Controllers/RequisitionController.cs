using Microsoft.AspNetCore.Mvc;
using SSIS.Models;
using SSIS.Services;
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
        private readonly IReqService _reqService;
        public RequisitionController(IReqService reqService)
        {
            _reqService = reqService;
        }

        [HttpPost("")]
        public IActionResult CreateReq([FromBody] Requisition req)
        {
            return Ok(_reqService.CreateRequisition(req).Result);
        }

        [HttpGet("")]
        public IActionResult RetrieveReq()
        {
            return Ok(_reqService.RetreiveRequisition().Result);
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
