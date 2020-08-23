using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using SSIS.Models;

namespace SSIS.Repositories
{
	public interface IItemRepository
	{
		Task<Item> GetItemById(Guid itemId);
		Task<List<Item>> GetAll();
		Task<bool> ItemExist(Guid itemId);
		Task<List<Item>> GetItemsByCategory(string name);
		Task<List<Item>> GetLowStockItems();
		Task<int> UpdateItem();
	}
}