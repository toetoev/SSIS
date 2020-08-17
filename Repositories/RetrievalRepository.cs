using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using SSIS.Databases;
using SSIS.Models;
using SSIS.Payloads;

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

        public async Task<List<Retrieval>> GetAll()
        {
            return await _dbContext.Retrievals.ToListAsync();
        }

        public async Task<Retrieval> GetRetrievalById(Guid id)
        {
            return await _dbContext.Retrievals.Where(r => r.Id == id).FirstOrDefaultAsync();
        }

        public async Task<int> DeleteRetrieval(Retrieval retrieval)
        {
            _dbContext.Retrievals.Remove(retrieval);
            return await _dbContext.SaveChangesAsync();
        }

        public async Task<int> UpdateRetrieval()
        {
            return await _dbContext.SaveChangesAsync();
        }
    }
}