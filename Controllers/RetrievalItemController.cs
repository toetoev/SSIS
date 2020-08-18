using System;
using System.Collections.Generic;
using System.Security.Claims;
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
    public class RetrievalItemController : ControllerBase
    {
        private readonly IRetrievalItemService _retrievalItemService;

        public RetrievalItemController(IRetrievalItemService retrievalItemService)
        {
            _retrievalItemService = retrievalItemService;
        }

        [HttpGet("")]
        [Authorize(Roles = StoreRole.Clerk)]
        public IActionResult GetAllRetrievalItems()
        {
            string email = User.FindFirst(ClaimTypes.Email).Value;
            return Ok(_retrievalItemService.GetAllRetrievalItems(email).Result);
        }
    }
}