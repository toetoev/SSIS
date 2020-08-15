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

    }

}