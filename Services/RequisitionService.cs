using System.Collections.Generic;
using System.Threading.Tasks;
using SSIS.Models;
using SSIS.Payloads;
using SSIS.Repositories;

namespace SSIS.Services
{
    public class RequisitionService : IRequisitionService
    {
        private readonly IRequisitionRepository _requisitionRepository;
        public RequisitionService(IRequisitionRepository requisitionRepository)
        {
            _requisitionRepository = requisitionRepository;
        }
        public async Task<ApiResponse> CreateRequisition(List<RequisitionItem> requisitionItems)
        {
            Requisition requisition = new Requisition { };
            if (await _requisitionRepository.CreateRequisition(requisition) != null)
                return new ApiResponse { Success = true };
            return new ApiResponse { Success = false, Message = "Create Requisition List Failed" };
        }
    }
}