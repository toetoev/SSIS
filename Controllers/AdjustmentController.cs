using System;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using SSIS.Models;
using SSIS.Services;

namespace SSIS.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AdjustmentController : ControllerBase
    {
        private readonly IAdjustmentService _adjustmentService;

        public AdjustmentController(IAdjustmentService adjustmentService)
        {
            _adjustmentService = adjustmentService;
        }

        [HttpGet("")]
        public IActionResult GetAllAdjustments()
        {
            return Ok(_adjustmentService.GetAllAdjustments().Result);
        }
    }
}