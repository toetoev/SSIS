using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using SSIS.Databases;
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

        public async Task<List<Order>> GetAll()
        {
            return await _dbContext.Orders.ToListAsync();
        }

        public async Task<Order> GetOrderBySupplierAndDate(Guid supplierId, DateTime date)
        {
            return await _dbContext.Orders.Where(o => o.SupplierId == supplierId && o.OrderedOn.Date == date).FirstOrDefaultAsync();
        }
    }
}