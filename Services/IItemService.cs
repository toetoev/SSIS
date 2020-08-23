using System;
using System.Threading.Tasks;
using SSIS.Models;
using SSIS.Payloads;

namespace SSIS.Services
{
        public interface IItemService
        {
                Task<ApiResponse> GetAllItems();

                Task<ApiResponse> GetAllItemsByCategory(string categoryName);

                Task<ApiResponse> GetItemById(Guid itemId);
                Task<ApiResponse> GetLowStockItems();
                Task<ApiResponse> CreateItem(Item item);
                Task<ApiResponse> DeleteItem(Guid itemId);
        }

}