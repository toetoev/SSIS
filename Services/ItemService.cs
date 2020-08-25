using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using SSIS.IRepositories;
using SSIS.IService;
using SSIS.Models;
using SSIS.Payloads;

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

        public async Task<ApiResponse> CreateItem(Item newItem)
        {
            // List<int> priorities = new List<int>();

            // if (newItem.ReorderLevel < newItem.Stock)
            // {
            //     foreach (var newSupplyTenderItem in newItem.SupplierTenderItems)
            //     {
            //         priorities.Add(newSupplyTenderItem.Priority);
            //     }

            //     bool priorityIsUnique = priorities.Distinct().Count() == priorities.Count();
            Category categoryFromRepo = await _categoryRepository.GetCategoryByName(newItem.CategoryName);

            //     if (priorityIsUnique)
            //     {
            Item item = new Item
            {
                Id = Guid.NewGuid(),
                Bin = newItem.Bin,
                Description = newItem.Description,
                UoM = newItem.UoM,
                ReorderLevel = newItem.ReorderLevel,
                ReorderQty = newItem.ReorderQty,
                Stock = newItem.Stock,
                Category = categoryFromRepo
            };

            foreach (var supplierTenderItem in newItem.SupplierTenderItems)
            {
                Supplier supplierFromRepo = await _supplierRepository.GetSupplierById(supplierTenderItem.SupplierId);
            }
            // foreach (var supplierTenderItem in newItem.SupplierTenderItems)
            // {
            //     Supplier supplierFromRepo = await _supplierRepository.GetSupplierById(supplierTenderItem.SupplierId);
            //     if (supplierFromRepo != null)
            //     {
            //         supplierTenderItem.ItemId = item.Id;
            //         supplierTenderItem.SupplierId = supplierFromRepo.Id;
            //     }
            //     else
            //     {
            //         return new ApiResponse { Success = true, Message = "Cannot find supplier" };
            //     }
            // }

            //         // item.SupplierTenderItems = newItem.SupplierTenderItems;
            return new ApiResponse { Success = true, Data = await _itemRepository.CreateItem(item) };

            //     // }
            //     // else
            //     // {
            //         return new ApiResponse { Success = true, Message = "Supplier priorities must be unique" };
            //     }
            // }
            // return new ApiResponse { Success = true, Message = "Reorder level must be less than Stock" };
        }
        public async Task<ApiResponse> UpdateItem(Guid itemId, Item item)
        {
            Item itemFromRepo = await _itemRepository.GetItemById(itemId);

            List<int> priorities = new List<int>();

            if (itemFromRepo != null)
            {
                foreach (var newSupplyTenderItem in item.SupplierTenderItems)
                {
                    priorities.Add(newSupplyTenderItem.Priority);
                }

                bool priorityIsUnique = priorities.Distinct().Count() == priorities.Count();

                if (priorityIsUnique)
                {
                    if (await _categoryRepository.CategoryExist(item.Category.Name))
                    {
                        itemFromRepo.Category.Name = item.Category.Name;
                        itemFromRepo.Description = item.Description;
                        itemFromRepo.UoM = item.UoM;
                        itemFromRepo.Bin = item.Bin;
                        itemFromRepo.ReorderLevel = item.ReorderLevel;
                        itemFromRepo.ReorderQty = item.ReorderQty;

                        foreach (var supplierTenderItem in itemFromRepo.SupplierTenderItems)
                        {
                            SupplierTenderItem supplierTenderItemInput = item.SupplierTenderItems.First(i => i.SupplierId == supplierTenderItem.SupplierId);
                            if (supplierTenderItemInput != null && await _supplierRepository.SupplierExist(supplierTenderItem.Supplier.Name))
                            {
                                supplierTenderItem.Price = supplierTenderItemInput.Price;
                                supplierTenderItem.Priority = supplierTenderItemInput.Priority;
                            }
                        }
                        return new ApiResponse { Success = true, Data = await _itemRepository.UpdateItem() };
                    }
                    else
                    {
                        return new ApiResponse { Success = false, Message = "Category does not exist" };
                    }
                }
                else
                {
                    return new ApiResponse { Success = true, Message = "Supplier priorities must be unique" };
                }
            }
            return new ApiResponse { Success = true, Message = "Reorder level must be less than Stock" };
        }

        public async Task<ApiResponse> DeleteItem(Guid itemId)
        {
            Item itemFromRepo = await _itemRepository.GetItemById(itemId);
            if (itemFromRepo != null)
            {
                return new ApiResponse { Success = true, Data = await _itemRepository.DeleteItem(itemFromRepo) };
            }
            return new ApiResponse { Success = false, Message = "Item to be deleted does not exist" };
        }
    }
}