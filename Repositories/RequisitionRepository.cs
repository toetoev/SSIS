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

        public async Task<List<Requisition>> GetRequisitionsByRole(DeptStaff deptStaff)
        {
            List<Requisition> requisitions = new List<Requisition>();

            switch (deptStaff.Role)
            {
                case DeptRole.Employee:
                    requisitions = await _dbContext.Requisitions.ToListAsync();
                    break;
                case DeptRole.DeptRep:
                    requisitions = await _dbContext.Requisitions.Where(r => r.Status != RequisitionStatus.APPLIED || r.Status != RequisitionStatus.REJECTED).ToListAsync();
                    break;
                case DeptRole.DeptHead:
                    requisitions = await _dbContext.Requisitions.Where(r => r.Status == RequisitionStatus.APPLIED || r.Status == RequisitionStatus.REJECTED || r.Status == RequisitionStatus.APPROVED).ToListAsync();
                    break;
                default:
                    // code block
                    break;
            }
            return requisitions;
        }
    }
}