using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using SSIS.Models;
using SSIS.Payloads;

namespace SSIS.Services
{
    public interface IRequisitionService
    {
        Task<ApiResponse> CreateRequisition(List<RequisitionItem> requisitionItems, string email);
        Task<ApiResponse> GetRequisitionsByDeptStaff(string email);
        Task<ApiResponse> GetRequisitionsByStatus(RequisitionStatus status);
        Task<ApiResponse> UpdateRequisitionStatus(Guid requisitionId, RequisitionStatus status, string email, string comment);
        Task<ApiResponse> GetRequisitionsByRetrievalId(Guid retrievalId, Guid itemId);
        Task<ApiResponse> GetPopularItems(string deptName);
    }
}