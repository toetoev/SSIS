using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using SSIS.Databases;
using SSIS.IRepositories;
using SSIS.Models;
using SSIS.ViewModel;

namespace SSIS.Repositories
{
    public class OrderItemRepository : IOrderItemRepository
    {
        private readonly DataContext _dbContext;

        public OrderItemRepository(DataContext dbContext) => _dbContext = dbContext;

        public async Task<OrderItem> GetOrderItemByPK(Guid itemId, Guid orderId) => await _dbContext.OrderItems.Where(oi => oi.ItemId == itemId && oi.OrderId == orderId).FirstOrDefaultAsync();

        public async Task<List<TrendViewModel>> GetOrderTrend(DateTime startDate, DateTime endDate, List<string> categories)
        {
            List<OrderItem> validOrderItems = await _dbContext.OrderItems
                .Where(oi => oi.Order.OrderedOn.Month.CompareTo(startDate.Month) >= 0 && oi.Order.OrderedOn.Month.CompareTo(endDate.Month) <= 0)
                .Where(oi => categories.Contains(oi.Item.CategoryName)).ToListAsync();
            List<TrendViewModel> orderTrends = new List<TrendViewModel>();
            foreach (var category in categories)
            {
                var tmp = validOrderItems.Where(oi => oi.Item.CategoryName == category)
                    .GroupBy(oi => oi.Order.OrderedOn.Month)
                    .Select(g => new { OrderedOn = g.Key, TotalQty = g.Sum(g => g.OrderedQty) }).ToList();
                List<int> monthlyTotalQty = new List<int>();
                for (int i = startDate.Month; i <= endDate.Month; i++)
                {
                    var tmpTotalQty = tmp.Where(t => t.OrderedOn == i).FirstOrDefault();
                    if (tmpTotalQty != null)
                        monthlyTotalQty.Add(tmpTotalQty.TotalQty);
                    else
                        monthlyTotalQty.Add(0);
                }
                orderTrends.Add(new TrendViewModel { Category = category, MonthlyTotalQty = monthlyTotalQty });
            }
            return orderTrends;
        }
    }
}