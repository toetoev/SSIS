using System;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using SSIS.Services;
using SSIS.Models;

namespace SSIS.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class SupplierTenderItemController : ControllerBase
    {
        private readonly ISupplierTenderItemService _supplierTenderItemService;

        public SupplierTenderItemController(ISupplierTenderItemService supplierTenderItemService)
        {
            _supplierTenderItemService = supplierTenderItemService;
        }

        [HttpGet("{itemId}")]
        [Authorize(Roles = StoreRole.Clerk)]
        public IActionResult GetSupplierTenderByItemId([FromRoute] Guid itemId)
        {
            return Ok(_supplierTenderItemService.GetSupplierTenderByItemId(itemId).Result);
        }
    }
}