using System;
using System.Collections.Generic;
using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using SSIS.IService;
using SSIS.Models;
using SSIS.Utils;

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
        [Authorize(Roles = StoreRole.Clerk)]
        public IActionResult GetAll()
        {
            return Ok(_orderService.GetAllOrders().Result);
        }

        [HttpPost("")]
        [Authorize(Roles = StoreRole.Clerk)]
        public IActionResult CreateOrder([FromBody] List<Order> orders)
        {
            string orderedBy = User.FindFirst(ClaimTypes.Email).Value;
            return Ok(_orderService.CreateOrder(orders, orderedBy).Result);
        }

        [HttpPut("{orderId}")]
        public IActionResult ReceiveOrder([FromRoute] Guid orderId, [FromBody] List<OrderItem> orderItems)
        {
            orderItems.ForEach(el => System.Console.WriteLine(el.ToString()));
            string receivedByEmail = User.FindFirst(ClaimTypes.Email).Value;
            return Ok(_orderService.ReceiveOrder(orderId, orderItems, receivedByEmail).Result);
        }

        [HttpDelete("{orderId}")]
        public IActionResult DeleteOrder([FromRoute] Guid orderId)
        {
            return Ok(_orderService.DeleteOrder(orderId).Result);
        }

        [HttpGet("{startDate}/{endDate}")]
        public IActionResult GetOrderTrend([FromRoute][JsonConverter(typeof(DateFormatConverter))] DateTime startDate, [FromRoute][JsonConverter(typeof(DateFormatConverter))] DateTime endDate, [FromBody] List<string> categories)
        {
            return Ok(_orderService.GetOrderTrend(startDate, endDate, categories).Result);
        }
    }
}