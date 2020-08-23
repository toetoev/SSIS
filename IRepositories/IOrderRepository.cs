using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using SSIS.Models;
using SSIS.Payloads;

namespace SSIS.IRepositories
{
    public interface IOrderRepository
    {
        Task<List<Order>> GetAll();
        Task<Order> GetOrderBySupplierAndDate(Guid supplierId, DateTime date);
        Task<int> CreateOrder(Order newOrder);
        Task<Order> GetOrderById(Guid orderId);
        Task<int> DeleteOrder(Order order);
    }
}