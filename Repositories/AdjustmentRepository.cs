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
    public class AdjustmentRepository : IAdjustmentRepository
    {
        private readonly DataContext _dbContext;
        public AdjustmentRepository(DataContext dbContext) => _dbContext = dbContext;
        public async Task<Adjustment> GetAdjustmentById(Guid adjustmentId) => await _dbContext.Adjustments.Where(a => a.Id == adjustmentId).FirstOrDefaultAsync();
        public async Task<int> CreateAdjustment(Adjustment adjustment)
        {
            _dbContext.Add(adjustment);
            return await _dbContext.SaveChangesAsync();
        }
        public async Task<List<Adjustment>> GetAll() => await _dbContext.Adjustments.OrderBy(a => a.Status).ThenBy(a => a.SubmittedOn).ToListAsync();
        public async Task<int> UpdateAdjustmentStatus() => await _dbContext.SaveChangesAsync();
        public async Task<int> UpdateAdjustment() => await _dbContext.SaveChangesAsync();
        public async Task<int> DeleteAdjustment(Adjustment adjustment)
        {
            _dbContext.Remove(adjustment);
            return await _dbContext.SaveChangesAsync();
        }
        public async Task<List<Adjustment>> GetAdjustmentByTotalPrice(bool isLowerThan)
        {
            if (isLowerThan)
                return await _dbContext.Adjustments.Where(a => a.AdjustmentItems.Sum(ai => ai.Item.SupplierTenderItems.Average(sti => sti.Price) * Math.Abs(ai.AdjustedQty)) <= 250).ToListAsync();
            else
                return await _dbContext.Adjustments.Where(a => a.AdjustmentItems.Sum(ai => ai.Item.SupplierTenderItems.Average(sti => sti.Price) * Math.Abs(ai.AdjustedQty)) > 250).ToListAsync();
        }
    }
}