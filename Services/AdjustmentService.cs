using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using SSIS.Models;
using SSIS.Payloads;
using SSIS.Repositories;
using SSIS.Services;

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

        public async Task<ApiResponse> GetAllAdjustments()
        {
            return new ApiResponse { Success = true, Data = await _adjustmentRepository.GetAll() };
        }
    }

}