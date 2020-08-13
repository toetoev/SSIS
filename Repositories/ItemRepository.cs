using Microsoft.EntityFrameworkCore;
using SSIS.Databases;
using SSIS.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SSIS.Repositories
{
    public class ItemRepository : IItemRepository
    {
        private readonly DataContext _dbContext;

        public ItemRepository(DataContext dbContext)
        {
            _dbContext = dbContext;
        }
        public async Task<List<Item>> GetAllItemsFromRepository()
        {
            return await _dbContext.Items.ToListAsync();
        }

        public async Task<Item> GetItemById(Item item)
        {
            return await _dbContext.Items.Where(i => i.Id == item.Id).FirstOrDefaultAsync();
        }
    }
}
