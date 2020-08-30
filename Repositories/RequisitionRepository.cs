using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using SSIS.Databases;
using SSIS.IRepositories;
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

        public async Task<List<Requisition>> GetRequisitionsByStatus(RequisitionStatus status) => await _dbContext.Requisitions.Where(r => r.Status == status).OrderBy(r => r.Status).ThenBy(r => r.RequestedOn).ToListAsync();

        public async Task<List<Requisition>> GetRequisitionsByDeptStaff(string deptName, List<RequisitionStatus> requisitionStatuses) => await _dbContext.Requisitions.Where(r => r.DepartmentName == deptName && requisitionStatuses.Contains(r.Status)).OrderBy(r => r.Status).ThenBy(r => r.RequestedOn).ToListAsync();

        public async Task<Requisition> GetRequisitionById(Guid requisitionId)
        {
            return await _dbContext.Requisitions.Where(r => r.Id == requisitionId).FirstOrDefaultAsync();
        }

        public async Task<int> UpdateRequisition()
        {
            return await _dbContext.SaveChangesAsync();
        }

        public async Task<List<Requisition>> GetRequisitionsByRetrievalId(Guid retrievalId, Guid itemId)
        {
            return await _dbContext.Requisitions.Where(r => r.RetrievalId == retrievalId && r.RequisitionItems.Any(ri => ri.ItemId == itemId)).OrderByDescending(r => r.RequestedOn).Select(r => new Requisition(
                r.Id,
                r.RequestedOn,
                r.ReviewedOn,
                r.Comment,
                r.AcknowledgedOn,
                r.Status,
                r.DepartmentName,
                r.Department,
                r.RequestedByEmail,
                r.RequestedBy,
                r.ReviewedByEmail,
                r.ReviewedBy,
                r.AcknowledgedByEmail,
                r.AcknowledgedBy,
                r.RequisitionItems.Where(ri => ri.ItemId == itemId).ToList(),
                r.RetrievalId
            )).ToListAsync();
        }

        public async Task<List<Item>> GetPopularItems(string deptName)
        {
            return await _dbContext.Items
                .Where(i => i.RequisitionItems.Where(ri => ri.Requisition.DepartmentName == deptName).Any())
                .GroupBy(i => i.Id)
                .OrderByDescending(i => i.Count())
                .Take(5)
                .Select(i => new Item { Id = i.Key })
                .ToListAsync();
        }
    }
}