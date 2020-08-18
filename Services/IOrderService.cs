using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using SSIS.Models;
using SSIS.Payloads;

namespace SSIS.Controllers
{
    public interface IOrderService
    {
        Task<ApiResponse> GetAllOrders();
        Task<ApiResponse> CreateOrder(List<Order> orders, string orderedByEmail);
        Task<ApiResponse> ReceiveOrder(Guid orderId, List<OrderItem> orderItems, string receivedByEmail);
    }
}