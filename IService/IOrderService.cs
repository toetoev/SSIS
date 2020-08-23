using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using SSIS.Models;
using SSIS.Payloads;

namespace SSIS.IService
{
    public interface IOrderService
    {
        Task<ApiResponse> GetAllOrders();
        Task<ApiResponse> CreateOrder(List<Order> orders, string orderedByEmail);
        Task<ApiResponse> ReceiveOrder(Guid orderId, List<OrderItem> orderItems, string receivedByEmail);
        Task<ApiResponse> DeleteOrder(Guid orderId);
        Task<ApiResponse> GetOrderTrend(DateTime startDate, DateTime endDate, List<string> categories);
    }
}