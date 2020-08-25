using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using SSIS.Models;
using SSIS.ViewModel;

namespace SSIS.IRepositories
{
    public interface IOrderItemRepository
    {
        Task<List<TrendViewModel>> GetOrderTrend(DateTime startDate, DateTime endDate, List<string> categories);
        Task<OrderItem> GetOrderItemByPK(Guid itemId, Guid orderId);
    }
}