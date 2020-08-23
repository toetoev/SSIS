using System;
using System.Collections.Generic;
using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using SSIS.IService;
using SSIS.Models;

namespace SSIS.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AdjustmentItemController : ControllerBase
    {
        private readonly IAdjustmentItemService _adjustmentItemService;

        public AdjustmentItemController(IAdjustmentItemService adjustmentItemService)
        {
            _adjustmentItemService = adjustmentItemService;
        }

        [HttpPut("{adjustmentId}")]
        [Authorize(Roles = StoreRole.Clerk)]
        public IActionResult UpdateAdjustmentItems([FromRoute] Guid adjustmentId, [FromBody] List<AdjustmentItem> adjustmentItems)
        {
            string submittedByEmail = User.FindFirst(ClaimTypes.Email).Value;
            return Ok(_adjustmentItemService.UpdateAdjustmentItems(adjustmentId, adjustmentItems, submittedByEmail).Result);
        }
    }
}