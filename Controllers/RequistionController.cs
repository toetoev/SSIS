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
    [ApiController]
    [Route("api/[controller]")]  
    public class RequistionController : ControllerBase
    {
        private readonly IRequisitionService _requistionService;

        public RequistionController(IRequisitionService requistionService)
        {
            _requistionService = requistionService;
        }

        [HttpPost("")]
        public IActionResult UpdateDeptRep([FromBody] Requisition requistion)
        {
            return Ok(_requistionService.UpdateRequisition(requistion).Result);
        }
    }
}

