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
        public async Task<ApiResponse> CreateAdjustment(string submittedByEmail, List<AdjustmentItem> adjustmentItems)
        {
            StoreStaff submittedBy = await _storeStaffRepository.GetStoreStaffByEmail(submittedByEmail);
            Adjustment adjustment = new Adjustment
            {
                Id = Guid.NewGuid(),
                SubmittedOn = DateTime.Now,
                SubmittedBy = submittedBy,
                Status = AdjustmentStatus.APPLIED
            };
            foreach (var adjustmentItem in adjustmentItems)
            {
                Item itemFromRepo = await _itemRepository.GetItemById(adjustmentItem.ItemId);
                if (itemFromRepo != null)
                {
                    if (adjustmentItem.AdjustedQty < 0)
                        if (itemFromRepo.Stock >= Math.Abs(adjustmentItem.AdjustedQty))
                            adjustmentItem.AdjustmentId = adjustment.Id;
                        else
                            return new ApiResponse { Success = false, Message = "Stock don't have enough items to deduct" };

                }
                else
                    return new ApiResponse { Success = false, Message = "Some items do not exist" };
            }
            adjustment.AdjustmentItems = adjustmentItems;
            return new ApiResponse { Success = true, Data = await _adjustmentRepository.CreateAdjustment(adjustment) };
        }

        public async Task<ApiResponse> UpdateAdjustmentStatus(Guid adjustmentId, AdjustmentStatus status, string email)
        {
            Adjustment adjustment = await _adjustmentRepository.GetAdjustmentById(adjustmentId);
            //StoreStaff storeStaff = await _storeStaffRepository.GetStoreStaffByEmail(email);
            if (adjustment != null && adjustment.Status == AdjustmentStatus.APPLIED)
            {
                adjustment.Status = status;
                return new ApiResponse { Success = true, Data = await _adjustmentRepository.UpdateAdjustmentStatus() };

            }
            return new ApiResponse { Success = false, Message = "Cannot find adjustment for reviewing" };
        }

        public async Task<ApiResponse> DeleteAdjustment(Guid adjustmentId)
        {
            Adjustment adjustmentFromRepo = await _adjustmentRepository.GetAdjustmentById(adjustmentId);
            if (adjustmentFromRepo != null)
            {
                return new ApiResponse { Success = true, Data = await _adjustmentRepository.DeleteAdjustment(adjustmentFromRepo) };
            }
            else
                return new ApiResponse { Success = false, Message = "Cannot find adjustment to delete" };
        }
    }
}