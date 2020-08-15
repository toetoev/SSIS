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
    public class RetrievalController : ControllerBase
    {
        private readonly IRetrievalService _retrievalService;
        public RetrievalController(IRetrievalService retrievalService)
        {
            _retrievalService = retrievalService;
        }

        [HttpPost("")]
        [Authorize(Roles = StoreRole.Clerk)]
        public void CreateRequisition([FromBody] List<Guid> requisitionIds)
        {
            string email = User.FindFirst(ClaimTypes.Email).Value;
            Dictionary<Guid, int> dic = (Dictionary<Guid, int>)_retrievalService.CreateRetrieval(requisitionIds, email).Result.Data;
        }
    }
}
