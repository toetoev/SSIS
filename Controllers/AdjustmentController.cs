using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
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

        [HttpPost("")]
        [Authorize(Roles = StoreRole.Clerk)]
        public IActionResult CreateAdjustment([FromBody] List<AdjustmentItem> adjustmentItems)
        {
            string email = User.FindFirst(ClaimTypes.Email).Value;
            return Ok(_adjustmentService.CreateAdjustment(email, adjustmentItems).Result);
        }
    }
}