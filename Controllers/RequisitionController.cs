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
    public class RequisitionController : ControllerBase
    {
        private readonly IRequisitionService _requisitionService;
        public RequisitionController(IRequisitionService requisitionService)
        {
            _requisitionService = requisitionService;
        }

        [HttpGet("{status}")]
        public IActionResult GetRequisitionsByStatus([FromRoute] string status)
        {
            System.Console.WriteLine(status);
            System.Console.WriteLine("1111111111111");
            return Ok();
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
    }
}