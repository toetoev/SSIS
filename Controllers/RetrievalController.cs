using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Authorization.Infrastructure;
using Microsoft.AspNetCore.Mvc;
using SSIS.Models;
using SSIS.Payloads;
using SSIS.Services;
using System;
using System.Collections.Generic;
using System.Security.Claims;

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
        public IActionResult GetAllRetrievals()
        {
            return Ok(_retrievalService.GetAllRetrievals().Result);
        }

        [HttpDelete("{id}")]
        [Authorize(Roles = StoreRole.Clerk)]
        public IActionResult DeleteRetrieval([FromQuery] Guid retrievalId)
        {
            return Ok(_retrievalService.DeleteRetrieval(retrievalId).Result);
        }
    }
}
