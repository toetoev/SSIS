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
            StoreStaff storeStaff = await _storeStaffRepository.GetStoreStaffByEmail(email);
            List<RetrievalItem> retrievalItems = new List<RetrievalItem>();
            Dictionary<Guid, int> totalItemQty = new Dictionary<Guid, int>();
            foreach (var requisitionId in requisitionIds)
            {
                Requisition requisition = await _requisitionRepository.GetRequisitionsById(requisitionId);
                if (requisition != null)
                {
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
            Retrieval retrieval = new Retrieval { Id = Guid.NewGuid(), CreatedBy = storeStaff, CreatedOn = DateTime.Now, RetrievalItems = retrievalItems };
            return new ApiResponse { Success = true, Data = await _retrievalRepository.CreateRetrieval(retrieval) };
        }
    }
}