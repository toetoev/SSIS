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

        public List<Item> GetAllItemsFromRepository()
        {
            return _dbContext.Items.ToList();       
        }
    }
}
