using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using SSIS.Databases;
using SSIS.Models;

namespace SSIS.Repositories
{
    public class ItemRepository : IItemRepository
    {
        private readonly DataContext _dbContext;

        public ItemRepository(DataContext dbContext)
        {
            _dbContext = dbContext;
        }
        public async Task<List<Item>> GetAll()
        {
            return await _dbContext.Items.ToListAsync();
        }

        public async Task<Item> GetItemById(Item item)
        {
            return await _dbContext.Items.Where(i => i.Id == item.Id).FirstOrDefaultAsync();
        }

        public async Task<List<Item>> GetItemsByCategory(string name)
        {
            return await _dbContext.Items.Where(i => i.CategoryName == name).ToListAsync();
        }

        public async Task<bool> ItemExist(Guid itemId)
        {
            return await _dbContext.Items.AnyAsync(i => i.Id == itemId);
        }
    }
}