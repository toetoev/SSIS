using System;
using System.Linq;
using System.Threading.Tasks;
using SSIS.Databases;
using SSIS.Models;
using SSIS.Payloads;
using SSIS.Repositories;

namespace SSIS.Services
{
    public class ItemService : IItemService
    {
        private readonly IItemRepository _itemRepository;

        public ItemService(IItemRepository itemRepository)
        {
            _itemRepository = itemRepository;
        }
        public async Task<ApiResponse> GetItemById(Guid itemId)
        {
            if (!await _itemRepository.ItemExist(itemId))
            {
                return new ApiResponse { Success = true, Data = await _itemRepository.GetItemById(itemId) };
            }
            return new ApiResponse { Success = false, Message = "item does not exist" };

        }

        public async Task<ApiResponse> GetAllItems()
        {
            return new ApiResponse { Success = true, Data = await _itemRepository.GetAll() };
        }

        public async Task<ApiResponse> GetAllItemsByCategory(string name)
        {
            return new ApiResponse { Success = true, Data = await _itemRepository.GetItemsByCategory(name) };
        }

        public async Task<ApiResponse> GetLowStockItems()
        {
            return new ApiResponse { Success = true, Data = await _itemRepository.GetLowStockItems() };
        }
    }
}