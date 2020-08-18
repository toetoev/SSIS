using Microsoft.AspNetCore.Mvc;

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
    }
}