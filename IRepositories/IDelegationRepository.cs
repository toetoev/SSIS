using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using SSIS.Models;

namespace SSIS.IRepositories
{
    public interface IDelegationRepository
    {
        Task<List<Delegation>> GetDelegationsByDepartment(string deptName);
        Task<int> CreateDelegation(Delegation delegation);
        Task<Delegation> GetDelegationByDelegatedByEmailAndStartDate(string delegatedByEmail, DateTime startDate);
        Task<int> UpdateDelegation();
        Task<int> DeleteDelegation(Delegation delegationFromRepo);
        Task<bool> IsDelegated(string deptStaffEmail);
        Task<Delegation> GetDelegationsById(Guid delegationId);
    }
}