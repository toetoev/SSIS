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
    public class RetrievalItemRepository : IRetrievalItemRepository
    {
        private readonly DataContext _dbContext;

        public RetrievalItemRepository(DataContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task<List<Retrieval>> GetAllByCurrentStaff(string currentStaffEmail)
        {
            return await _dbContext.Retrievals.Where(r => r.CreatedBy.Email == currentStaffEmail).ToListAsync();
        }

        public async Task<List<RetrievalItem>> GetAllRetrievalItems(string email)
        {
            return await _dbContext.RetrievalItems.Where(ri => ri.Retrieval.CreatedBy.Email == email).ToListAsync();
        }
    }
}