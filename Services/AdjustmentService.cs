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
        private readonly ItemRepository _itemRepository;

        public AdjustmentService(IAdjustmentRepository adjustmentRepository, ItemRepository itemRepository)
        {
            _adjustmentRepository = adjustmentRepository;
            _itemRepository = itemRepository;

        }
        public async Task<ApiResponse> GetAllAdjustments()
        {
            return new ApiResponse { Success = true, Data = await _adjustmentRepository.GetAll() };
        }

        public async Task<ApiResponse> UpdateAdjustment(Guid adjustmentId, List<AdjustmentItem> adjustmentItems, string email)
        {
            Adjustment adjustment = await _adjustmentRepository.GetAdjustmentById(adjustmentId);

            if (adjustment != null && adjustment.SubmittedByEmail == email && adjustment.Status == AdjustmentStatus.APPLIED)
            {
                foreach (var adjustmentItem in adjustment.AdjustmentItems)
                {
                    AdjustmentItem adjustmentItemInput = adjustmentItems.Find(ai => ai.ItemId == adjustmentItem.ItemId);
                    int adjustItemQty = adjustmentItemInput.AdjustedQty;
                    if (adjustItemQty < 0)
                    {
                        adjustItemQty *= -1;
                    }
                    if (adjustmentItemInput != null)
                    {

                        Item itemFromRepo = await _itemRepository.GetItemById(adjustmentItem.ItemId);
                        {
                            if (adjustmentItemInput.AdjustedQty <= itemFromRepo.Stock)
                            {
                                adjustmentItem.AdjustedQty = adjustmentItemInput.AdjustedQty;
                                await _adjustmentRepository.UpdateAdjustment();
                            }
                            else
                                return new ApiResponse { Success = false, Message = "Sorry, don't have enough item to adjust" };
                        }
                    }
                }
            }
            return new ApiResponse { Success = true, Data = await _adjustmentRepository.UpdateAdjustment() };
        }
    }
}