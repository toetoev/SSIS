using System.Collections.Generic;
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

        public async Task<List<Order>> GetAll()
        {
            return await _dbContext.Orders.ToListAsync();
        }
    }
}