using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using SSIS.Models;
using SSIS.Payloads;
using SSIS.Repositories;

namespace SSIS.Services
{
    public class RetrievalService : IRetrievalService
    {
        private readonly IRequisitionRepository _requisitionRepository;
        private readonly IStoreStaffRepository _storeStaffRepository;
        private readonly IRetrievalRepository _retrievalRepository;

        public RetrievalService(IRequisitionRepository requisitionRepository, IStoreStaffRepository storeStaffRepository, IRetrievalRepository retrievalRepository)
        {
            _requisitionRepository = requisitionRepository;
            _storeStaffRepository = storeStaffRepository;
            _retrievalRepository = retrievalRepository;
        }

        public async Task<ApiResponse> CreateRetrieval(List<Guid> requisitionIds, string email)
        {
            StoreStaff storeStaff = await NewMethod(email);
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
                        {
                            totalItemQty[requisitionItem.ItemId] += requisitionItem.Need;
                        }
                        else
                        {
                            totalItemQty.Add(requisitionItem.ItemId, requisitionItem.Need);
                        }
                    }
                }
            }
            foreach (var itemId in totalItemQty.Keys)
            {
                retrievalItems.Add(new RetrievalItem { ItemId = itemId, TotalQtyNeeded = totalItemQty[itemId] });
            }
            Retrieval retrieval = new Retrieval { Id = retrievalId, CreatedBy = storeStaff, CreatedOn = DateTime.Now, RetrievalItems = retrievalItems };
            return new ApiResponse { Success = true, Data = await _retrievalRepository.CreateRetrieval(retrieval) };
        }

        private async Task<StoreStaff> NewMethod(string email)
        {
            return await _storeStaffRepository.GetStoreStaffByEmail(email);
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
            return new ApiResponse { Success = false, Message = "Could not find the retrieval to delete" };
        }

        public async Task<ApiResponse> GetAllRetrievals()
        {
            return new ApiResponse { Success = true, Data = await _retrievalRepository.GetAll() };
        }

        public async Task<ApiResponse> UpdateRetrievalActualQuantity(Guid retrievalId, Dictionary<Guid, int> itemIdWithActualQuantity, string email)
        {
            StoreStaff storeStaff = await _storeStaffRepository.GetStoreStaffByEmail(email);

            Retrieval retrieval = await _retrievalRepository.GetRetrievalById(retrievalId);

            if (retrieval != null && retrieval.CreatedBy == storeStaff)
            {
                ICollection<RetrievalItem> retrievalItems = retrieval.RetrievalItems;
                foreach (var item in itemIdWithActualQuantity.Keys)
                {
                    foreach (var retrievalitem in retrievalItems)
                    {
                        if (item == retrievalitem.ItemId && (itemIdWithActualQuantity[item] < retrievalitem.TotalQtyNeeded))
                        {
                            retrievalitem.TotalQtyRetrieved = itemIdWithActualQuantity[item];
                        }
                    }

                }

            }
            return new ApiResponse { Success = true, Data = await _retrievalRepository.UpdateRetrieval() };

        }
    }
}