using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using SSIS.Databases;
using SSIS.IRepositories;
using SSIS.Models;

namespace SSIS.Repositories
{
    public class ItemRepository : IItemRepository
    {
        private readonly DataContext _dbContext;

        public ItemRepository(DataContext dbContext) => _dbContext = dbContext;

        public async Task<int> CreateItem(Item item)
        {
            _dbContext.Items.Add(item);
            return await _dbContext.SaveChangesAsync();
        }

        public async Task<List<Item>> GetAll() => await _dbContext.Items.OrderBy(i => i.Description).ToListAsync();

        public async Task<Item> GetItemById(Guid itemId) => await _dbContext.Items.Where(i => i.Id == itemId).FirstOrDefaultAsync();

        public async Task<List<Item>> GetItemsByCategory(string name) => await _dbContext.Items.Where(i => i.CategoryName == name).OrderBy(i => i.Description).ToListAsync();

        public async Task<List<Item>> GetLowStockItems()
        {
            return await _dbContext.Items
                .Where(i => i.Stock <= i.ReorderLevel)
                .Where(i => !i.OrderItems.Any(oi => oi.Order.OrderedOn.Date.CompareTo(DateTime.Now.Date) <= 0))
                .OrderBy(i => i.CategoryName)
                .ToListAsync();
        }

        public async Task<bool> ItemExist(Guid itemId) => await _dbContext.Items.AnyAsync(i => i.Id == itemId);
        public async Task<int> DeleteItem(Item itemFromRepo)
        {
            _dbContext.Items.Remove(itemFromRepo);
            return await _dbContext.SaveChangesAsync();
        }

        public async Task<int> UpdateItem() => await _dbContext.SaveChangesAsync();
    }
}