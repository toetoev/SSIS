using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using SSIS.IRepositories;
using SSIS.IService;
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

        public async Task<ApiResponse> ReviewAdjustment(Guid adjustmentId, AdjustmentStatus status, string email)
        {
            Adjustment adjustmentFromRepo = await _adjustmentRepository.GetAdjustmentById(adjustmentId);
            StoreStaff storeStaffFromRepo = await _storeStaffRepository.GetStoreStaffByEmail(email);
            if (adjustmentFromRepo != null && adjustmentFromRepo.Status == AdjustmentStatus.APPLIED)
            {
                // TODO: check voucher price by role
                bool itemsValid = true;
                foreach (var adjustmentItem in adjustmentFromRepo.AdjustmentItems)
                {
                    Item itemFromRepo = await _itemRepository.GetItemById(adjustmentItem.ItemId);
                    if (itemFromRepo != null)
                    {
                        if (adjustmentItem.AdjustedQty < 0)
                        {
                            if (itemFromRepo.Stock < Math.Abs(adjustmentItem.AdjustedQty))
                            {
                                itemsValid = false;
                                return new ApiResponse { Success = false, Message = "Stock don't have enough items to deduct" };
                            }
                        }
                        itemFromRepo.Stock += adjustmentItem.AdjustedQty;
                    }
                    else
                        return new ApiResponse { Success = false, Message = "Some items do not exist" };
                }
                if (itemsValid)
                {
                    adjustmentFromRepo.Status = status;
                    if (status == AdjustmentStatus.ISSUED)
                    {
                        adjustmentFromRepo.IssuedOn = DateTime.Now;
                        adjustmentFromRepo.IssuedBy = storeStaffFromRepo;
                    }
                    return new ApiResponse { Success = true, Data = await _adjustmentRepository.UpdateAdjustmentStatus() };
                }
            }
            return new ApiResponse { Success = false, Message = "Cannot find adjustment for reviewing" };
        }

        public async Task<ApiResponse> DeleteAdjustment(Guid adjustmentId, string deletedByemail)
        {
            Adjustment adjustmentFromRepo = await _adjustmentRepository.GetAdjustmentById(adjustmentId);
            StoreStaff storeStaffFromRepo = await _storeStaffRepository.GetStoreStaffByEmail(deletedByemail);
            if (adjustmentFromRepo != null)
            {
                if (adjustmentFromRepo.Status == AdjustmentStatus.APPLIED)
                {
                    if (adjustmentFromRepo.SubmittedByEmail == storeStaffFromRepo.Email)
                        return new ApiResponse { Success = true, Data = await _adjustmentRepository.DeleteAdjustment(adjustmentFromRepo) };
                    else
                        return new ApiResponse { Success = false, Message = "Cannot delete other people's voucher" };
                }
                else if (adjustmentFromRepo.Status == AdjustmentStatus.ISSUED)
                    return new ApiResponse { Success = false, Message = "Cannot delete issued voucher" };
                else
                    return new ApiResponse { Success = false, Message = "Cannot delete rejected voucher" };

            }
            else
                return new ApiResponse { Success = false, Message = "Cannot find adjustment to delete" };
        }

        public Task<ApiResponse> GetAdjustmentByStoreStaff()
        {
            throw new NotImplementedException();
        }
    }
}