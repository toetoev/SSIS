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
    public class RequisitionItemService : IRequisitionItemService
    {
        private readonly IRequisitionItemRepository _requisitionItemRepository;

        public RequisitionItemService(IRequisitionItemRepository requisitionItemRepository)
        {
            _requisitionItemRepository = requisitionItemRepository;
        }

        public async Task<ApiResponse> DisburseRequisition(List<RequisitionItem> requisitionItems, string email)
        {
            int totalQtyDisbursed = 0;
            int totalQtyRetrieved = 0;
            List<RequisitionItem> requisitionItemsFromRepo = new List<RequisitionItem>();
            foreach (var requisitionItem in requisitionItems)
            {
                RequisitionItem requisitionItemFromRepo = await _requisitionItemRepository.GetRequisitionItemByPK(requisitionItem.RequisitionId, requisitionItem.ItemId);
                if (requisitionItemFromRepo != null)
                    requisitionItemsFromRepo.Add(requisitionItemFromRepo);
            }
            if (requisitionItemsFromRepo.Count() == requisitionItems.Count())
            {
                totalQtyRetrieved = requisitionItemsFromRepo.First().Requisition.Retrieval.RetrievalItems.Where(ri => ri.ItemId == requisitionItems.First().ItemId).Select(ri => ri.TotalQtyRetrieved).Single();
                foreach (var requisitionItem in requisitionItemsFromRepo)
                {
                    RequisitionItem requisitionItemInput = requisitionItems.Find(ri => ri.ItemId == requisitionItem.ItemId && ri.RequisitionId == requisitionItem.RequisitionId);
                    if (requisitionItem.Need >= requisitionItemInput.Actual)
                    {
                        totalQtyDisbursed += requisitionItemInput.Actual;
                        requisitionItem.Actual = requisitionItemInput.Actual;
                    }
                }
                if (totalQtyRetrieved >= totalQtyDisbursed)
                {
                    requisitionItemsFromRepo.First().Requisition.Status = RequisitionStatus.PENDING_COLLECTION;
                    await _requisitionItemRepository.UpdateRequisitionItems();
                }
                return new ApiResponse { Success = false, Message = "Total quantity retrieved doesn't match total quantity disbursed" };
            }
            else
                return new ApiResponse { Success = false, Message = "Cannot find all the items to be disbursed" };
        }
    }
}