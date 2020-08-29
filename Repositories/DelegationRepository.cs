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
    public class DelegationRepository : IDelegationRepository
    {
        private readonly DataContext _dbContext;
        public DelegationRepository(DataContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task<int> CreateDelegation(Delegation delegation)
        {
            _dbContext.Add(delegation);
            return await _dbContext.SaveChangesAsync();
        }

        public async Task<Delegation> GetDelegationByDelegatedByEmailAndStartDate(string delegatedByEmail, DateTime startDate) => await _dbContext.Delegations.Where(d => d.DelegatedBy.Email == delegatedByEmail && d.StartDate == startDate).FirstOrDefaultAsync();

        public async Task<List<Delegation>> GetDelegationsByDepartment(string deptName)
        {
            return await _dbContext.Delegations.Where(d => d.DelegatedBy.DepartmentName == deptName).OrderBy(d => d.StartDate).ToListAsync();
        }

        public async Task<int> UpdateDelegation()
        {
            return await _dbContext.SaveChangesAsync();
        }
        public async Task<int> DeleteDelegation(Delegation delegationFromRepo)
        {
            _dbContext.Delegations.Remove(delegationFromRepo);
            return await _dbContext.SaveChangesAsync();
        }

        public async Task<bool> IsDelegated(string deptStaffEmail)
        {
            return await _dbContext.Delegations.AnyAsync(d => d.DelegatedToEmail == deptStaffEmail && d.StartDate.CompareTo(DateTime.Now) <= 0 && d.EndDate.CompareTo(DateTime.Now) >= 0);
        }

        public async Task<Delegation> GetDelegationsById(Guid delegationId)
        {
            return await _dbContext.Delegations.Where(d => d.Id == delegationId).FirstOrDefaultAsync();
        }
    }
}