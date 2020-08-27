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
    public class RetrievalService : IRetrievalService
    {
        private readonly IRequisitionRepository _requisitionRepository;
        private readonly IStoreStaffRepository _storeStaffRepository;
        private readonly IRetrievalRepository _retrievalRepository;
        private readonly IItemRepository _itemRepository;

        public RetrievalService(IRequisitionRepository requisitionRepository, IStoreStaffRepository storeStaffRepository, IRetrievalRepository retrievalRepository, IItemRepository itemRepository)
        {
            _requisitionRepository = requisitionRepository;
            _storeStaffRepository = storeStaffRepository;
            _retrievalRepository = retrievalRepository;
            _itemRepository = itemRepository;
        }

        public async Task<ApiResponse> CreateRetrieval(List<Guid> requisitionIds, string email)
        {
            StoreStaff storeStaff = await _storeStaffRepository.GetStoreStaffByEmail(email);
            List<RetrievalItem> retrievalItems = new List<RetrievalItem>();
            Dictionary<Guid, int> totalItemQty = new Dictionary<Guid, int>();
            Guid retrievalId = Guid.NewGuid();
            foreach (var requisitionId in requisitionIds)
            {
                Requisition requisition = await _requisitionRepository.GetRequisitionById(requisitionId);
                if (requisition != null && requisition.Status == RequisitionStatus.APPROVED)
                {
                    requisition.Status = RequisitionStatus.PROCESSING_RETRIEVAL;
                    requisition.RetrievalId = retrievalId;
                    foreach (var requisitionItem in requisition.RequisitionItems)
                    {
                        if (totalItemQty.ContainsKey(requisitionItem.ItemId))
                            totalItemQty[requisitionItem.ItemId] += requisitionItem.Need;
                        else
                            totalItemQty.Add(requisitionItem.ItemId, requisitionItem.Need);
                    }
                }
                else
                    return new ApiResponse { Success = false, Message = "Cannot find all approved requisitions" };

            }
            foreach (var itemId in totalItemQty.Keys)
                retrievalItems.Add(new RetrievalItem { ItemId = itemId, TotalQtyNeeded = totalItemQty[itemId], TotalQtyRetrieved = -1 });
            Retrieval retrieval = new Retrieval { Id = retrievalId, CreatedBy = storeStaff, CreatedOn = DateTime.Now, RetrievalItems = retrievalItems };
            return new ApiResponse { Success = true, Data = await _retrievalRepository.CreateRetrieval(retrieval) };
        }

        public async Task<ApiResponse> DeleteRetrieval(Guid retrievalId)
        {
            Retrieval retrieval = await _retrievalRepository.GetRetrievalById(retrievalId);
            if (retrieval != null)
            {
                foreach (var requisition in retrieval.Requisitions)
                {
                    requisition.Status = RequisitionStatus.APPROVED;
                    requisition.RetrievalId = null;
                }
                return new ApiResponse { Success = true, Data = await _retrievalRepository.DeleteRetrieval(retrieval) };
            }
            return new ApiResponse { Success = false, Message = "Cannot find the retrieval to delete" };
        }

        public async Task<ApiResponse> GetAllRetrievalsByCurrentStaff(string currentStaffEmail)
        {
            return new ApiResponse { Success = true, Data = await _retrievalRepository.GetAllByCurrentStaff(currentStaffEmail) };
        }

        public async Task<ApiResponse> UpdateRetrievalActualQuantity(Guid retrievalId, List<RetrievalItem> retrievalItems, string email)
        {
            Retrieval retrieval = await _retrievalRepository.GetRetrievalById(retrievalId);
            if (retrieval != null && retrieval.CreatedBy.Email == email)
            {
                foreach (var retrievalItem in retrieval.RetrievalItems)
                {
                    RetrievalItem retrievalItemInput = retrievalItems.Find(ri => ri.ItemId == retrievalItem.ItemId);
                    if (retrievalItemInput != null && retrievalItem.TotalQtyNeeded >= retrievalItemInput.TotalQtyRetrieved)
                    {
                        Item itemFromRepo = await _itemRepository.GetItemById(retrievalItemInput.ItemId);
                        if (retrievalItemInput.TotalQtyRetrieved <= itemFromRepo.Stock)
                        {
                            retrievalItem.TotalQtyRetrieved = retrievalItemInput.TotalQtyRetrieved;
                            List<Requisition> requisitions = await _requisitionRepository.GetRequisitionsByRetrievalId(retrievalId, itemFromRepo.Id);
                            foreach (var requisition in requisitions)
                                foreach (var item in requisition.RequisitionItems)
                                    item.Actual = -1;
                            await _retrievalRepository.UpdateRetrieval();
                        }
                        else
                            return new ApiResponse { Success = false, Message = "Sorry, don't have enough item to retrieve" };
                    }
                    else
                        return new ApiResponse { Success = false, Message = "Please don't retrieve items more than needed" };
                }
            }
            return new ApiResponse { Success = true, Data = await _retrievalRepository.UpdateRetrieval() };
        }
    }
}