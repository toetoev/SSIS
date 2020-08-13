using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using SSIS.Models;
using SSIS.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;

namespace SSIS.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class RequisitionController : ControllerBase
    {
        private readonly IReqService _reqService;
        public RequisitionController(IReqService reqService)
        {
            _reqService = reqService;
        }

        [HttpPost("")]
        [Authorize(Roles = DeptRole.Employee)]
        public IActionResult CreateReq([FromBody] List<RequisitionItem> rList)
        {
            DeptStaff requestedBy = new DeptStaff { Email = User.FindFirst(ClaimTypes.Email).Value};
            return Ok(_reqService.CreateReq(rList, requestedBy).Result);
            // return Ok(_authService.Login(user).Result);
        }

        //[HttpGet("")]
        //public IActionResult RetrieveReq()
        //{
        //    return Ok(_reqService.RetreiveRequisition().Result);
        //}

        //[HttpPut("")]
        //public IActionResult UpdateRep([FromBody] Requisition req)
        //{
        //    return null;
        //}

        //[HttpDelete("")]
        //public IActionResult DeleteReq([FromBody] Requisition req)
        //{
        //    return null;
        //}
    }
}
