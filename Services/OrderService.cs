using System.Threading.Tasks;
using SSIS.Controllers;
using SSIS.Payloads;

namespace SSIS.Services
{
    public class OrderService : IOrderService
    {
        private readonly IOrderRepository _orderRepository;
        public OrderService(IOrderRepository orderRepository)
        {
            _orderRepository = orderRepository;
        }
        public async Task<ApiResponse> GetAllOrders()
        {
            return new ApiResponse { Success = true, Data = await _orderRepository.GetAll() };
        }
    }
}