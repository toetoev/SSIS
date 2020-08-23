using System;
using System.Collections.Generic;
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
        private readonly ISupplierRepository _supplierRepository;
        private readonly ICategoryRepository _categoryRepository;

        public ItemService(IItemRepository itemRepository, ISupplierRepository supplierRepository, ICategoryRepository categoryRepository)
        {
            _itemRepository = itemRepository;
            _supplierRepository = supplierRepository;
            _categoryRepository = categoryRepository;
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

        public async Task<ApiResponse> UpdateItem(Guid itemId, Item item)
        {
            Item itemFromRepo = await _itemRepository.GetItemById(itemId);
            //List<SupplierTenderItem> SupplierTenderItemsFromRepo = (List<SupplierTenderItem>) itemFromRepo.SupplierTenderItems;

            if (itemFromRepo != null)
            {
                itemFromRepo.Description = item.Description;
                itemFromRepo.UoM = item.UoM;
                itemFromRepo.Bin = item.Bin;
                itemFromRepo.ReorderLevel = item.ReorderLevel;
                itemFromRepo.ReorderQty = item.ReorderQty;

                if (await _categoryRepository.CategoryExist(item.Category.Name))
                {
                    itemFromRepo.Category.Name = item.Category.Name;
                }

                foreach (var supplierTenderItem in itemFromRepo.SupplierTenderItems)
                {

                    SupplierTenderItem supplierTenderItemInput = item.SupplierTenderItems.First(i => i.SupplierId == supplierTenderItem.SupplierId);
                    if (supplierTenderItemInput != null && await _supplierRepository.SupplierExist(supplierTenderItem.SupplierId))
                    {
                        supplierTenderItem.Price = supplierTenderItem.Price;
                        supplierTenderItem.Priority = supplierTenderItem.Priority;
                    }
                }
                return new ApiResponse { Success = true, Data = await _itemRepository.UpdateItem() };
            }

        }
    }
}