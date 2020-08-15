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

        public async Task<List<Requisition>> GetRequisitionsByDeptStaff(string email)
        {
            List<Requisition> requisitions = new List<Requisition>();
            DeptStaff deptStaff = await _dbContext.DeptStaffs.Where(ds => ds.Email == email).FirstOrDefaultAsync();

            switch (deptStaff.Role)
            {
                case DeptRole.Employee:
                    requisitions = await _dbContext.Requisitions.Where(r => r.Department.Name == deptStaff.Department.Name).ToListAsync();
                    break;
                case DeptRole.DeptRep:
                    requisitions = await _dbContext.Requisitions.Where(r => r.Department.Name == deptStaff.Department.Name && r.Status != RequisitionStatus.APPLIED || r.Status != RequisitionStatus.REJECTED).ToListAsync();
                    break;
                case DeptRole.DeptHead:
                    requisitions = await _dbContext.Requisitions.Where(r => r.Department.Name == deptStaff.Department.Name && r.Status != RequisitionStatus.PROCESSING_RETRIEVAL).ToListAsync();
                    break;
                default:
                    break;
            }
            return requisitions;
        }

        public async Task<Requisition> GetRequisitionsById(Guid requisitionId)
        {
            return await _dbContext.Requisitions.Where(r => r.Id == requisitionId).SingleOrDefaultAsync();
        }
    }
}