using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using SSIS.Models;

namespace SSIS.IRepositories
{
    public interface IRequisitionRepository
    {
        Task<int> CreateRequisition(Requisition requisition);
        Task<List<Requisition>> GetRequisitionsByDeptStaff(string deptName, List<RequisitionStatus> requisitionStatuses);

        Task<List<Requisition>> GetRequisitionsByStatus(RequisitionStatus status);
        Task<Requisition> GetRequisitionById(Guid requisitionId);
        Task<int> UpdateRequisition();
        Task<List<Requisition>> GetRequisitionsByRetrievalId(Guid retrievalId, Guid itemId);
        Task<List<Item>> GetPopularItems(string deptName);
    }
}