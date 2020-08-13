<<<<<<< HEAD
﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using SSIS.Models;
=======
﻿using SSIS.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
>>>>>>> b3e833763d8bd0c17d57d81163798f2fb9a91df8

namespace SSIS.Repositories
{
    public interface IItemRepository
    {
        Task<Item> GetItemById(Item item);
<<<<<<< HEAD
        Task<List<Item>> GetAll();
        Task<bool> ItemExist(Guid itemId);
=======
        Task<List<Item>> GetAllItemsFromRepository();
>>>>>>> b3e833763d8bd0c17d57d81163798f2fb9a91df8
    }
}