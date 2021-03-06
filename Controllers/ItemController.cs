using System;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using SSIS.IService;
using SSIS.Models;

namespace SSIS.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ItemController : ControllerBase
    {
        private readonly IItemService _itemService;

        public ItemController(IItemService itemService)
        {
            _itemService = itemService;
        }

        [HttpGet("")]
        [Authorize(Roles = StoreRole.Clerk + "," + DeptRole.Employee + "," + StoreRole.Manager)]
        public IActionResult GetAllItems()
        {
            return Ok(_itemService.GetAllItems().Result);
        }

        [HttpGet("low-stock")]
        [Authorize(Roles = StoreRole.Clerk)]
        public IActionResult GetLowStockItems()
        {
            return Ok(_itemService.GetLowStockItems().Result);
        }

        [HttpPost("")]
        [Authorize(Roles = StoreRole.Manager)]
        public IActionResult CreateItem([FromBody] Item item)
        {
            return Ok(_itemService.CreateItem(item).Result);
        }

        [HttpPut("{itemId}")]
        [Authorize(Roles = StoreRole.Manager)]
        public IActionResult UpdateItem([FromRoute] Guid itemId, [FromBody] Item item)
        {
            return Ok(_itemService.UpdateItem(itemId, item).Result);
        }

        [HttpDelete("{itemId}")]
        [Authorize(Roles = StoreRole.Manager)]
        public IActionResult DeleteItem([FromRoute] Guid itemId)
        {
            return Ok(_itemService.DeleteItem(itemId).Result);
        }
    }
}