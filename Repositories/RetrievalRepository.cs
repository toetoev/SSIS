using SSIS.Databases;
using SSIS.Models;
using SSIS.Payloads;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SSIS.Repositories
{
    public class RetrievalRepository : IRetrievalRepository
    {
        private readonly DataContext _dbContext;
        public RetrievalRepository(DataContext dbContext)
        {
            _dbContext = dbContext;
        }
        public async Task<int> CreateRetrieval(Retrieval retrieval)
        {
            _dbContext.Add(retrieval);
            return await _dbContext.SaveChangesAsync();
        }
    }
}