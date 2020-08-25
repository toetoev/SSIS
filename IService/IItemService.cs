using System;
using System.Threading.Tasks;
using SSIS.Models;
using SSIS.Payloads;

namespace SSIS.IService
{
    public interface IItemService
    {
        Task<ApiResponse> GetAllItems();
        Task<ApiResponse> GetAllItemsByCategory(string categoryName);
        Task<ApiResponse> GetItemById(Guid itemId);
        Task<ApiResponse> GetLowStockItems();
        Task<ApiResponse> UpdateItem(Guid itemId, Item item);
        Task<ApiResponse> CreateItem(Item item);
        Task<ApiResponse> DeleteItem(Guid itemId);
    }

}