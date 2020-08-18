using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using SSIS.Databases;
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

        public async Task<List<Delegation>> GetDelegationsByDeptHeadEmail(string delegatedByEmail)
        {
            return await _dbContext.Delegations.Where(d => d.DelegatedBy.Email == delegatedByEmail).ToListAsync();
        }
    }
}