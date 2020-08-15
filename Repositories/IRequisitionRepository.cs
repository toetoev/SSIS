using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using SSIS.Models;

namespace SSIS.Repositories
{
    public interface IRequisitionRepository
    {
        Task<int> CreateRequisition(Requisition requisition);
        Task<List<Requisition>> GetRequisitionsByDeptStaff(string email);
        Task<List<Requisition>> GetRequisitionsByStatus(RequisitionStatus status);
        Task<Requisition> GetRequisitionById(Guid id);
    }
}