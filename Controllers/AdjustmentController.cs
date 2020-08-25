using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Authorization.Infrastructure;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion.Internal;
using SSIS.IService;
using SSIS.Models;
using SSIS.Payloads;

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

        // TODO: GetAdjustmentByStoreStaff [Manager, Supervisor] return according to total price $250

        [HttpGet("")]
        [Authorize(Roles = StoreRole.All)]
        public IActionResult GetAdjustmentByStoreStaff()
        {
            string email = User.FindFirst(ClaimTypes.Email).Value;
            return Ok(_adjustmentService.GetAdjustmentByStoreStaff().Result);
        }

        [HttpPost("")]
        [Authorize(Roles = StoreRole.Clerk + "," + StoreRole.Manager)]
        public IActionResult CreateAdjustment([FromBody] List<AdjustmentItem> adjustmentItems)
        {
            string submittedByEmail = User.FindFirst(ClaimTypes.Email).Value;
            return Ok(_adjustmentService.CreateAdjustment(submittedByEmail, adjustmentItems).Result);
        }

        [HttpPut("{adjustmentId}")]
        [Authorize(Roles = StoreRole.Manager + "," + StoreRole.Supervisor)]
        public IActionResult ReviewAdjustment([FromRoute] Guid adjustmentId, [FromBody] AdjustmentStatus status)
        {
            string email = User.FindFirst(ClaimTypes.Email).Value;
            return Ok(_adjustmentService.ReviewAdjustment(adjustmentId, status, email).Result);
        }

        [HttpDelete("{adjustmentId}")]
        [Authorize(Roles = StoreRole.Clerk)]
        public IActionResult DeleteAdjustment([FromRoute] Guid adjustmentId)
        {
            string deletedByemail = User.FindFirst(ClaimTypes.Email).Value;
            return Ok(_adjustmentService.DeleteAdjustment(adjustmentId, deletedByemail).Result);
        }
    }
}