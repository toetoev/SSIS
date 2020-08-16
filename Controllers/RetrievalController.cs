using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Authorization.Infrastructure;
using Microsoft.AspNetCore.Mvc;
using SSIS.Models;
using SSIS.Payloads;
using SSIS.Services;

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
    }
}