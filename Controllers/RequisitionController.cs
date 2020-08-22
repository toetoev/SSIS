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
    public class RequisitionController : ControllerBase
    {
        private readonly IRequisitionService _requisitionService;
        public RequisitionController(IRequisitionService requisitionService)
        {
            _requisitionService = requisitionService;
        }

        [HttpPut("{requisitionId}")]
        [Authorize(Roles = DeptRole.DeptHead + "," + DeptRole.DeptRep)]
        public IActionResult UpdateRequisitionStatus([FromRoute] Guid requisitionId, [FromBody] Requisition requisition)
        {
            string email = User.FindFirst(ClaimTypes.Email).Value;
            return Ok(_requisitionService.UpdateRequisitionStatus(requisitionId, requisition.Status, email, requisition.Comment).Result);
        }

        [HttpGet("{status}")]
        [Authorize(Roles = StoreRole.Clerk)]
        public IActionResult GetRequisitionsByStatus([FromRoute] RequisitionStatus status)
        {
            return Ok(_requisitionService.GetRequisitionsByStatus(status).Result);
        }

        [HttpGet("")]
        [Authorize(Roles = DeptRole.All)]
        public IActionResult GetRequisitionsByDeptStaff()
        {
            string email = User.FindFirst(ClaimTypes.Email).Value;
            return Ok(_requisitionService.GetRequisitionsByDeptStaff(email).Result);
        }

        [HttpPost("")]
        [Authorize(Roles = DeptRole.Employee)]
        public IActionResult CreateRequisition([FromBody] List<RequisitionItem> requisitionItems)
        {
            string email = User.FindFirst(ClaimTypes.Email).Value;
            return Ok(_requisitionService.CreateRequisition(requisitionItems, email).Result);
        }

        [HttpGet("{retrievalId}/requisition-item/{itemId}")]
        [Authorize(Roles = StoreRole.Clerk)]
        public IActionResult GetRequisitionsByRetrievalId([FromRoute] Guid retrievalId, [FromRoute] Guid itemId)
        {
            return Ok(_requisitionService.GetRequisitionsByRetrievalId(retrievalId, itemId).Result);
        }

        [HttpGet("popular")]
        [Authorize(Roles = DeptRole.Employee)]
        public IActionResult GetPopularItems([FromQuery] string deptName)
        {
            return Ok(_requisitionService.GetPopularItems(deptName).Result);
        }
    }
}