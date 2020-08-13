using SSIS.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SSIS.Repositories
{
    public interface IItemRepository
    {
        Task<Item> GetItemById(Item item);
        Task<List<Item>> GetAllItemsFromRepository();
    }
}