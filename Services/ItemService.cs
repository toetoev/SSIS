using System;
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
        private readonly ISupplierTenderItemRepository _supplierTenderItemRepository;
        private readonly ICategoryRepository _categoryRepository;

        public ItemService(IItemRepository itemRepository, ISupplierRepository supplierRepository, ICategoryRepository categoryRepository, ISupplierTenderItemRepository supplierTenderItemRepository)
        {
            _itemRepository = itemRepository;
            _supplierRepository = supplierRepository;
            _categoryRepository = categoryRepository;
            _supplierTenderItemRepository = supplierTenderItemRepository;
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

        // TODO: test
        public async Task<ApiResponse> CreateItem(Item item)
        {
            Category categoryFromRepo = await _categoryRepository.GetCategoryByName(item.CategoryName);
            if (categoryFromRepo != null)
            {
                if (!item.Description.Equals(""))
                {
                    if (item.ReorderLevel >= 0 && item.ReorderQty >= 0 && item.Stock >= 0)
                    {
                        bool[] isPriorityValid = Enumerable.Repeat(false, 3).ToArray();
                        Item newItem = new Item { Id = Guid.NewGuid(), Bin = item.Bin, Description = item.Description, UoM = item.UoM, ReorderLevel = item.ReorderLevel, ReorderQty = item.ReorderQty, Stock = item.Stock, Category = categoryFromRepo };
                        if (item.SupplierTenderItems.Count() == 3)
                        {
                            foreach (var supplierTenderItem in item.SupplierTenderItems)
                            {
                                Supplier supplierFromRepo = await _supplierRepository.GetSupplierById(supplierTenderItem.SupplierId);
                                if (supplierFromRepo != null)
                                {
                                    if (supplierTenderItem.Priority >= 1 && supplierTenderItem.Priority <= 3)
                                        isPriorityValid[supplierTenderItem.Priority - 1] = true;
                                    supplierTenderItem.Supplier = supplierFromRepo;
                                }
                                else
                                    return new ApiResponse { Success = false, Message = "Some of the suppliers does not exist" };
                                if (supplierTenderItem.Price <= 0)
                                    return new ApiResponse { Success = false, Message = "Price should be a positive number" };
                            }
                        }
                        else
                            return new ApiResponse { Success = false, Message = "Three suppliers infomation must be provided" };
                        if (isPriorityValid.All(f => f == true))
                        {
                            newItem.SupplierTenderItems = item.SupplierTenderItems;
                            return new ApiResponse { Success = true, Data = await _itemRepository.CreateItem(newItem) };
                        }
                        else
                            return new ApiResponse { Success = false, Message = "Three suppliers should have all different priority" };
                    }
                    else
                        return new ApiResponse { Success = false, Message = "Item reorder level, reorder quantity and stock cannot be lower than zero" };
                }
                else
                    return new ApiResponse { Success = false, Message = "Item description cannot be empty" };
            }
            else
                return new ApiResponse { Success = false, Message = "Category chosen does not exist" };
        }
        public async Task<ApiResponse> UpdateItem(Guid itemId, Item item)
        {
            Item itemFromRepo = await _itemRepository.GetItemById(itemId);
            bool[] isPriorityValid = Enumerable.Repeat(false, 3).ToArray();
            if (itemFromRepo != null)
            {
                Category categoryFromRepo = await _categoryRepository.GetCategoryByName(item.CategoryName);
                if (categoryFromRepo != null)
                {
                    if (!item.Description.Equals(""))
                    {
                        if (item.ReorderLevel >= 0 && item.ReorderQty >= 0 && item.Stock >= 0)
                        {
                            foreach (var newSupplyTenderItem in item.SupplierTenderItems)
                            {
                                if (newSupplyTenderItem.Priority >= 1 && newSupplyTenderItem.Priority <= 3)
                                    isPriorityValid[newSupplyTenderItem.Priority - 1] = true;
                            }
                            if (isPriorityValid.All(f => f == true))
                            {
                                itemFromRepo.Category = categoryFromRepo;
                                itemFromRepo.Description = item.Description;
                                itemFromRepo.UoM = item.UoM;
                                itemFromRepo.Bin = item.Bin;
                                itemFromRepo.ReorderLevel = item.ReorderLevel;
                                itemFromRepo.ReorderQty = item.ReorderQty;
                                foreach (var supplierTenderItem in item.SupplierTenderItems)
                                {
                                    Supplier supplierFromRepo = await _supplierRepository.GetSupplierById(supplierTenderItem.SupplierId);
                                    if (supplierFromRepo != null)
                                    {
                                        SupplierTenderItem supplierTenderItemFromRepo = await _supplierTenderItemRepository.GetSupplierTenderItemByItemIdAndPriority(itemFromRepo.Id, supplierTenderItem.Priority);
                                        if (supplierTenderItemFromRepo != null)
                                        {
                                            supplierTenderItemFromRepo.Supplier = supplierFromRepo;
                                            supplierTenderItemFromRepo.Price = supplierTenderItem.Price;
                                        }
                                        else
                                            itemFromRepo.SupplierTenderItems.Add(supplierTenderItem);
                                    }
                                    if (supplierTenderItem.Price <= 0)
                                        return new ApiResponse { Success = false, Message = "Price should be a positive number" };
                                }
                                return new ApiResponse { Success = true, Data = await _itemRepository.UpdateItem() };
                            }
                            else
                            {
                                return new ApiResponse { Success = true, Message = "Supplier priorities must be unique" };
                            }
                        }
                        else
                            return new ApiResponse { Success = false, Message = "Item reorder level, reorder quantity and stock cannot be lower than zero" };
                    }
                    else
                        return new ApiResponse { Success = false, Message = "Item description cannot be empty" };
                }
                else
                    return new ApiResponse { Success = false, Message = "Category chosen does not exist" };
            }
            return new ApiResponse { Success = false, Message = "Reorder level must be less than Stock" };
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