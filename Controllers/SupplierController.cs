using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Authorization.Infrastructure;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion.Internal;
using SSIS.Models;
using SSIS.Payloads;
using SSIS.Services;

namespace SSIS.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class SupplierController : ControllerBase
    {
        private readonly ISupplierService _supplierService;

        public SupplierController(ISupplierService supplierService)
        {
            _supplierService = supplierService;
        }

        [HttpGet("")]
        public IActionResult GetAllSuppliers()
        {
            return Ok(_supplierService.GetAllSuppliers().Result);
        }

        [HttpGet("{supplierId}")]
        public IActionResult GetSupplierById([FromRoute] Guid supplierId)
        {
            return Ok(_supplierService.GetSupplierById(supplierId).Result);
        }
    }
}