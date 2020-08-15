using SSIS.Models;
using SSIS.Payloads;
using SSIS.Repositories;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace SSIS.Services
{
    public class RetrievalService : IRetrievalService
    {
        private readonly IRetrievalRepository _retrievalRepository;
        private readonly IStoreStaffRepository _storeStaffRepository;
        private readonly IRequisitionRepository _requisitionRepository;

        public RetrievalService(IRetrievalRepository retrievalRepository,
        IStoreStaffRepository storeStaffRepository,
        IRequisitionRepository requisitionRepository)
        {
            _retrievalRepository = retrievalRepository;
            _storeStaffRepository = storeStaffRepository;
            _requisitionRepository = requisitionRepository;
        }
        public async Task<ApiResponse> CreateRetrieval(List<Guid> requisitionIds, string email)
        {
            StoreStaff createdBy = await _storeStaffRepository.GetStoreStaffByEmail(email);
            List<Requisition> requisitions = new List<Requisition>();

            Dictionary<Guid, Dictionary<Guid, int>> retrievals = new Dictionary<Guid, Dictionary<Guid, int>>();
            Dictionary<Guid, int> totalQty = new Dictionary<Guid, int>();

            foreach (var requisitionId in requisitionIds)
            {
                requisitions.Add(await _requisitionRepository.GetRequisitionById(requisitionId));
            }

            Retrieval retrieval = new Retrieval
            {
                Id = Guid.NewGuid(),
                CreatedOn = DateTime.Now,
                CreatedBy = createdBy
            };

            foreach (var requisition in requisitions)
            {
                foreach (var requisitionItem in requisition.RequisitionItems)
                {
                    if (totalQty.ContainsKey(requisitionItem.RequisitionId))
                    {
                        totalQty[requisitionItem.RequisitionId] += requisitionItem.Need;
                    }
                    else
                        totalQty.Add(requisitionItem.ItemId, requisitionItem.Need);
                }
            }

            foreach (var pair in totalQty)
            {
                Console.WriteLine($"Key {pair.Key}: Id={pair.Value}");
            }

            return new ApiResponse { Success = true, Data = totalQty };
        }
    }
}
