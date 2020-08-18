using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using SSIS.Databases;
using SSIS.Models;

namespace SSIS.Repositories
{
    public class AdjustmentRepository : IAdjustmentRepository
    {
        private readonly DataContext _dbContext;
        public AdjustmentRepository(DataContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task<Adjustment> GetAdjustmentById(Guid adjustmentId)
        {
            return await _dbContext.Adjustments.Where(a => a.Id == adjustmentId).FirstOrDefaultAsync();
        }

        public async Task<List<Adjustment>> GetAll()
        {
            return await _dbContext.Adjustments.ToListAsync();
        }

        public async Task<int> UpdateAdjustment()
        {
            return await _dbContext.SaveChangesAsync();
        }
    }
}