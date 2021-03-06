using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using SSIS.Databases;
using SSIS.IRepositories;
using SSIS.Models;

namespace SSIS.Services
{
    public class OrderRepository : IOrderRepository
    {
        private readonly DataContext _dbContext;
        public OrderRepository(DataContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task<int> CreateOrder(Order newOrder)
        {
            _dbContext.Add(newOrder);
            return await _dbContext.SaveChangesAsync();
        }

        public async Task<int> DeleteOrder(Order order)
        {
            _dbContext.Remove(order);
            return await _dbContext.SaveChangesAsync();
        }

        public async Task<List<Order>> GetAll()
        {
            return await _dbContext.Orders.OrderBy(o => o.Status).ThenByDescending(o => o.OrderedOn).ToListAsync();
        }

        public async Task<Order> GetOrderById(Guid orderId)
        {
            return await _dbContext.Orders.Where(o => o.Id == orderId).OrderBy(o => o.Status).ThenByDescending(o => o.OrderedOn).FirstOrDefaultAsync();
        }

        public async Task<Order> GetOrderBySupplierAndDate(Guid supplierId, DateTime date) => await _dbContext.Orders.Where(o => o.SupplierId == supplierId && o.OrderedOn.Date == date.Date).FirstOrDefaultAsync();

        public async Task<int> UpdateOrder()
        {
            return await _dbContext.SaveChangesAsync();
        }
    }
}