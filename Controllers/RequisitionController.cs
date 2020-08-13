using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Net;
using System.Security.AccessControl;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using SSIS.Models;
using SSIS.Payloads;
using SSIS.Repositories;
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

        // TODO: Example of get current user
        // User.FindFirst(ClaimTypes.Email).Value
        // TODO: Example of print out item list from body
        // requisitionItems.ForEach(ri => System.Console.WriteLine(ri.ToString()));

        [HttpPost("")]
        [Authorize(Roles = DeptRole.Employee)]
        public IActionResult CreateRequisition([FromBody] List<RequisitionItem> requisitionItems)
        {
            return Ok(_requisitionService.CreateRequisition(requisitionItems).Result);
            // return Ok(_authService.Login(user).Result);
        }

        // [Authorize(Roles = StoreRole.Clerk)]
    }
}