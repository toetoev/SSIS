using System.Collections.Generic;
using System.Threading.Tasks;
using SSIS.Models;
using SSIS.Payloads;

namespace SSIS.Services
{
    public interface IRequisitionService
    {
        Task<ApiResponse> CreateRequisition(List<RequisitionItem> requisitionItems);
    }
}