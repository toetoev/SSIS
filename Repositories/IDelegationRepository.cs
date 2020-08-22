using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using SSIS.Models;
namespace SSIS.Repositories
{
    public interface IDelegationRepository
    {
        Task<List<Delegation>> GetDelegationsByDeptHeadEmail(string delegatedByEmail);
        Task<int> CreateDelegation(Delegation delegation);
        Task<Delegation> GetDelegationByDelegatedByEmailAndStartDate(string delegatedByEmail, DateTime startDate);
        Task<int> UpdateDelegation();
        Task<int> DeleteDelegation(Delegation delegationFromRepo);
    }
}