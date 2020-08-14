using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using SSIS.Models;

namespace SSIS.Repositories
{
        public interface IItemRepository
        {
                Task<Item> GetItemById(Item item);
                Task<List<Item>> GetAll();
                Task<bool> ItemExist(Guid itemId);
        }
}