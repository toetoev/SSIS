<<<<<<< HEAD
﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using SSIS.Databases;
using SSIS.Models;
=======
﻿using Microsoft.EntityFrameworkCore;
using SSIS.Databases;
using SSIS.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
>>>>>>> b3e833763d8bd0c17d57d81163798f2fb9a91df8

namespace SSIS.Repositories
{
    public class ItemRepository : IItemRepository
    {
        private readonly DataContext _dbContext;

        public ItemRepository(DataContext dbContext)
        {
            _dbContext = dbContext;
        }
<<<<<<< HEAD
        public async Task<List<Item>> GetAll()
=======
        public async Task<List<Item>> GetAllItemsFromRepository()
>>>>>>> b3e833763d8bd0c17d57d81163798f2fb9a91df8
        {
            return await _dbContext.Items.ToListAsync();
        }

        public async Task<Item> GetItemById(Item item)
        {
            return await _dbContext.Items.Where(i => i.Id == item.Id).FirstOrDefaultAsync();
        }
<<<<<<< HEAD

        public async Task<bool> ItemExist(Guid itemId)
        {
            return await _dbContext.Items.AnyAsync(i => i.Id == itemId);
        }
    }
}
=======
    }
}
>>>>>>> b3e833763d8bd0c17d57d81163798f2fb9a91df8
