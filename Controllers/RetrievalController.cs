using System;
using System.Collections.Generic;
using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Authorization.Infrastructure;
using Microsoft.AspNetCore.Mvc;
using SSIS.IService;
using SSIS.Models;
using SSIS.Payloads;

namespace SSIS.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class RetrievalController : ControllerBase
    {
        private readonly IRetrievalService _retrievalService;
        public RetrievalController(IRetrievalService retrievalService)
        {
            _retrievalService = retrievalService;
        }

        [HttpPost("")]
        [Authorize(Roles = StoreRole.Clerk)]
        public IActionResult CreateRetrieval([FromBody] List<Guid> requisitionIds)
        {
            string email = User.FindFirst(ClaimTypes.Email).Value;
            return Ok(_retrievalService.CreateRetrieval(requisitionIds, email).Result);
        }

        [HttpGet("")]
        [Authorize(Roles = StoreRole.Clerk)]
        public IActionResult GetAllRetrievalsByCurrentStaff()
        {
            string email = User.FindFirst(ClaimTypes.Email).Value;
            return Ok(_retrievalService.GetAllRetrievalsByCurrentStaff(email).Result);
        }

        [HttpDelete("{retrievalId}")]
        [Authorize(Roles = StoreRole.Clerk)]
        public IActionResult DeleteRetrieval([FromRoute] Guid retrievalId)
        {
            return Ok(_retrievalService.DeleteRetrieval(retrievalId).Result);
        }

        [HttpPut("{retrievalId}")]
        [Authorize(Roles = StoreRole.Clerk)]
        public IActionResult UpdateRetrievalActualQuantity([FromRoute] Guid retrievalId, [FromBody] List<RetrievalItem> retrievalItems)
        {
            string email = User.FindFirst(ClaimTypes.Email).Value;
            return Ok(_retrievalService.UpdateRetrievalActualQuantity(retrievalId, retrievalItems, email).Result);
        }
    }
}