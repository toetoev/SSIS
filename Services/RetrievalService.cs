<<<<<<< HEAD
using SSIS.Models;
using SSIS.Payloads;
using SSIS.Repositories;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;
=======
using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using SSIS.Models;
using SSIS.Payloads;
using SSIS.Repositories;
>>>>>>> 43d56b6f56503484fac0cda95016988eff8fd940

namespace SSIS.Services
{
    public class RetrievalService : IRetrievalService
    {
<<<<<<< HEAD
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
=======
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
>>>>>>> 43d56b6f56503484fac0cda95016988eff8fd940
