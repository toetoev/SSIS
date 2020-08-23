using System;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using SSIS.IService;
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

        [HttpGet("{supplierId}")]
        [Authorize(Roles = StoreRole.Clerk)]
        public IActionResult GetSupplierTenderBySupplierId([FromRoute] Guid supplierId)
        {
            return Ok(_supplierTenderItemService.GetSupplierTenderBySupplierId(supplierId).Result);
        }
    }
}