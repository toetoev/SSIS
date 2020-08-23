using System.Collections.Generic;
using System.Threading.Tasks;
using SSIS.Models;
using SSIS.Payloads;

namespace SSIS.IService
{
    public interface IRequisitionItemService
    {
        Task<ApiResponse> DisburseRequisition(List<RequisitionItem> requisitionItems, string email);
    }
}