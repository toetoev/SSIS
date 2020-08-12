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

        public async Task<Item> GetAllItemsFromRepository()
        {
            return null;
        }
    }
}
