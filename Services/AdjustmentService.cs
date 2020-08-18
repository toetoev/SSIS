using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using SSIS.Models;
using SSIS.Payloads;
using SSIS.Repositories;

namespace SSIS.Services
{
    public class AdjustmentService : IAdjustmentService
    {
        private readonly IAdjustmentRepository _adjustmentRepository;
        private readonly IStoreStaffRepository _storeStaffRepository;
        private readonly IItemRepository _itemRepository;

        public AdjustmentService(IAdjustmentRepository adjustmentRepository,
            IStoreStaffRepository storeStaffRepository,
            IItemRepository itemRepository)
        {
            _adjustmentRepository = adjustmentRepository;
            _storeStaffRepository = storeStaffRepository;
            _itemRepository = itemRepository;
        }

        public AdjustmentService(IAdjustmentRepository adjustmentRepository, ItemRepository itemRepository)
        {
            _adjustmentRepository = adjustmentRepository;
            _itemRepository = itemRepository;

        }
        public async Task<ApiResponse> GetAllAdjustments()
        {
            return new ApiResponse { Success = true, Data = await _adjustmentRepository.GetAll() };
        }
        public async Task<ApiResponse> CreateAdjustment(string email, List<AdjustmentItem> adjustmentItems)
        {
            StoreStaff submittedBy = await _storeStaffRepository.GetStoreStaffByEmail(email);
            Adjustment adjustment = new Adjustment
            {
                Id = Guid.NewGuid(),
                SubmittedOn = DateTime.Now,
                SubmittedBy = submittedBy,
                Status = AdjustmentStatus.APPLIED
            };
            foreach (var adjustmentItem in adjustmentItems)
            {
                if (!await _itemRepository.ItemExist(adjustmentItem.ItemId))
                {
                    return new ApiResponse { Success = false, Message = "Some items do not exist" };
                }
                adjustmentItem.AdjustmentId = adjustment.Id;

            }
            adjustment.AdjustmentItems = adjustmentItems;
            return new ApiResponse { Success = true, Data = await _adjustmentRepository.CreateAdjustment(adjustment) };
        }
        public async Task<ApiResponse> UpdateAdjustment(Guid adjustmentId, List<AdjustmentItem> adjustmentItems, string submittedByEmail)
        {
            Adjustment adjustmentFromRepo = await _adjustmentRepository.GetAdjustmentById(adjustmentId);
            if (adjustmentFromRepo != null && adjustmentFromRepo.SubmittedByEmail == submittedByEmail)
            {
                if (adjustmentFromRepo.Status == AdjustmentStatus.APPLIED)
                {
                    foreach (var adjustmentItem in adjustmentFromRepo.AdjustmentItems)
                    {
                        AdjustmentItem adjustmentItemInput = adjustmentItems.Find(ai => ai.ItemId == adjustmentItem.ItemId);
                        if (adjustmentItemInput != null)
                        {
                            Item itemFromRepo = await _itemRepository.GetItemById(adjustmentItem.ItemId);
                            if (itemFromRepo != null)
                            {
                                if (adjustmentItemInput.AdjustedQty <= itemFromRepo.Stock)
                                {
                                    adjustmentItem.AdjustedQty = adjustmentItemInput.AdjustedQty;
                                }
                                else
                                    return new ApiResponse { Success = false, Message = "Sorry, cannot adjust quantity more than stock quantity" };
                            }
                            else return new ApiResponse { Success = false };
                        }
                        else
                            return new ApiResponse { Success = false };
                    }
                }
                else
                    return new ApiResponse { Success = false, Message = "Cannot edit issued adjustment voucher" };
            }
            else
                return new ApiResponse { Success = false };
            return new ApiResponse { Success = true, Data = await _adjustmentRepository.UpdateAdjustment() };
        }
    }
}