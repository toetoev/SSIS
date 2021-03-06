using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using SSIS.IRepositories;
using SSIS.IService;
using SSIS.Models;
using SSIS.Payloads;

namespace SSIS.Services
{
    public class AdjustmentItemService : IAdjustmentItemService
    {
        private readonly IAdjustmentRepository _adjustmentRepository;
        private readonly IItemRepository _itemRepository;

        public AdjustmentItemService(IItemRepository itemRepository, IAdjustmentRepository adjustmentRepository)
        {
            _itemRepository = itemRepository;
            _adjustmentRepository = adjustmentRepository;
        }

        public async Task<ApiResponse> UpdateAdjustmentItems(Guid adjustmentId, List<AdjustmentItem> adjustmentItems, string submittedByEmail)
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
                                if (adjustmentItemInput.AdjustedQty < 0)
                                {
                                    if (itemFromRepo.Stock >= Math.Abs(adjustmentItemInput.AdjustedQty))
                                    {
                                        adjustmentItem.AdjustedQty = adjustmentItemInput.AdjustedQty;
                                    }
                                    return new ApiResponse { Success = false, Message = "Adjusted quantity cannot be more than stock quantity" };
                                }
                                else
                                    adjustmentItem.AdjustedQty = adjustmentItemInput.AdjustedQty;
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