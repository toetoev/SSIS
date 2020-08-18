using System.Collections.Generic;
using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using SSIS.Models;
using SSIS.Services;

namespace SSIS.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class RequisitionItemController : ControllerBase
    {
        private readonly IRequisitionItemService _requisitionItemService;

        public RequisitionItemController(IRequisitionItemService requisitionItemService)
        {
            _requisitionItemService = requisitionItemService;
        }

        [HttpPut("")]
        [Authorize(Roles = StoreRole.Clerk)]
        public IActionResult DisburseRequisition([FromBody] List<RequisitionItem> requisitionItems)
        {
            string email = User.FindFirst(ClaimTypes.Email).Value;
            return Ok(_requisitionItemService.DisburseRequisition(requisitionItems, email).Result);
        }
    }
}