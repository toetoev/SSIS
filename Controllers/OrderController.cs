using Microsoft.AspNetCore.Mvc;

namespace SSIS.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class OrderController : ControllerBase
    {
        private readonly IOrderService _orderService;
    }
}