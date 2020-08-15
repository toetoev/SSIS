<<<<<<< HEAD
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using SSIS.Models;
using SSIS.Services;
=======
>>>>>>> 43d56b6f56503484fac0cda95016988eff8fd940
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
<<<<<<< HEAD
=======
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Authorization.Infrastructure;
using Microsoft.AspNetCore.Mvc;
using SSIS.Models;
using SSIS.Payloads;
using SSIS.Services;
>>>>>>> 43d56b6f56503484fac0cda95016988eff8fd940

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
<<<<<<< HEAD
        public void CreateRequisition([FromBody] List<Guid> requisitionIds)
        {
            string email = User.FindFirst(ClaimTypes.Email).Value;
            Dictionary<Guid, int> dic = (Dictionary<Guid, int>)_retrievalService.CreateRetrieval(requisitionIds, email).Result.Data;
        }
    }
}
=======
        public IActionResult CreateRetrieval([FromBody] List<Guid> requisitionIds)
        {
            string email = User.FindFirst(ClaimTypes.Email).Value;
            return Ok(_retrievalService.CreateRetrieval(requisitionIds, email).Result);
        }
    }
}
>>>>>>> 43d56b6f56503484fac0cda95016988eff8fd940
