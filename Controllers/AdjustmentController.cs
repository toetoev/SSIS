using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Authorization.Infrastructure;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion.Internal;
using SSIS.Models;
using SSIS.Payloads;
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

        [HttpPut("{adjustmentId}")]
        [Authorize(Roles = StoreRole.Clerk)]
        public IActionResult UpdateAdjustment([FromRoute] Guid adjustmentId, [FromBody] List<AdjustmentItem> adjustmentItems)
        {
            string email = User.FindFirst(ClaimTypes.Email).Value;
            return Ok(_adjustmentService.UpdateAdjustment(adjustmentId, adjustmentItems, email).Result);
        }
    }
}