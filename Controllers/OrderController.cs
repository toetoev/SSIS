using System.Collections.Generic;
using System.Security.Claims;
using Microsoft.AspNetCore.Mvc;
using SSIS.Models;

namespace SSIS.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class OrderController : ControllerBase
    {
        private readonly IOrderService _orderService;

        public OrderController(IOrderService orderService)
        {
            _orderService = orderService;
        }

        [HttpGet("")]
        public IActionResult GetAll()
        {
            return Ok(_orderService.GetAllOrders().Result);
        }

        [HttpPost("")]
        public IActionResult CreateOrder([FromBody] List<Order> orders)
        {
            string orderedBy = User.FindFirst(ClaimTypes.Email).Value;
            return Ok(_orderService.CreateOrder(orders, orderedBy).Result);
        }
    }
}