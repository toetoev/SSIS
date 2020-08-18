using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using SSIS.Databases;
using SSIS.Models;

namespace SSIS.Repositories
{
    public class RequisitionRepository : IRequisitionRepository
    {
        private readonly DataContext _dbContext;
        public RequisitionRepository(DataContext dbContext)
        {
            _dbContext = dbContext;
        }
        public async Task<int> CreateRequisition(Requisition requisition)
        {
            _dbContext.Add(requisition);
            return await _dbContext.SaveChangesAsync();
        }

        public async Task<List<Requisition>> GetRequisitionsByStatus(RequisitionStatus status)
        {
            return await _dbContext.Requisitions.Where(r => r.Status == status).ToListAsync();
        }

        public async Task<List<Requisition>> GetRequisitionsByDeptStaff(string deptName, List<RequisitionStatus> requisitionStatuses)
        {
            return await _dbContext.Requisitions.Where(r => r.DepartmentName == deptName && requisitionStatuses.Contains(r.Status)).ToListAsync();
        }

        public async Task<Requisition> GetRequisitionById(Guid requisitionId)
        {
            return await _dbContext.Requisitions.Where(r => r.Id == requisitionId).FirstOrDefaultAsync();
        }

        public async Task<int> UpdateRequisition()
        {
            return await _dbContext.SaveChangesAsync();
        }

        public async Task<List<Requisition>> GetRequisitionsByRetrievalId(Guid retrievalId)
        {
            return await _dbContext.Requisitions.Where(r => r.RetrievalId == retrievalId).OrderBy(r => r.RequestedOn).ToListAsync();
        }
    }
}