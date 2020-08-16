using System;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using SSIS.Models;
using SSIS.Services;

namespace SSIS.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ItemController : ControllerBase
    {
        private readonly IItemService _itemService;
        
        public ItemController(IItemService itemService){
            _itemService = itemService;
        }

        [HttpGet("")]        
        public IActionResult GetAllItems()
        {
            return Ok(_itemService.GetAllItems().Result);
        }

    }
}