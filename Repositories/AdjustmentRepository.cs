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
        public AdjustmentRepository(DataContext dbContext)
        {
            _dbContext = dbContext;
        }
        public async Task<Adjustment> GetAdjustmentById(Guid adjustmentId)
        {
            return await _dbContext.Adjustments.Where(a => a.Id == adjustmentId).FirstOrDefaultAsync();
        }
        public async Task<int> CreateAdjustment(Adjustment adjustment)
        {
            _dbContext.Add(adjustment);
            return await _dbContext.SaveChangesAsync();
        }
        public async Task<List<Adjustment>> GetAll()
        {
            return await _dbContext.Adjustments.OrderBy(a => a.Status).ThenByDescending(a => a.SubmittedOn).ToListAsync();
        }
        public async Task<int> UpdateAdjustment()
        {
            return await _dbContext.SaveChangesAsync();
        }
        public async Task<int> DeleteAdjustment(Adjustment adjustment)
        {
            _dbContext.Remove(adjustment);
            return await _dbContext.SaveChangesAsync();
        }
        public async Task<List<Adjustment>> GetAdjustmentByTotalPrice(bool isLowerThan)
        {
            Dictionary<Guid, double> adjustmentTotalPrices = new Dictionary<Guid, double>();
            List<Adjustment> adjustments = await _dbContext.Adjustments.ToListAsync();
            foreach (var adjustment in adjustments)
            {
                double totalPrice = 0;
                foreach (var adjustmentItem in adjustment.AdjustmentItems)
                {
                    double avgPrice = 0;
                    foreach (var item in adjustmentItem.Item.SupplierTenderItems)
                        avgPrice += item.Price;
                    totalPrice += Math.Abs(adjustmentItem.AdjustedQty) * avgPrice;
                }
                adjustmentTotalPrices[adjustment.Id] = totalPrice;
            }
            if (isLowerThan)
                return adjustments.Where(a => adjustmentTotalPrices[a.Id] <= 250).OrderBy(a => a.Status).ThenBy(a => a.SubmittedOn).ToList();
            else
                return adjustments.Where(a => adjustmentTotalPrices[a.Id] > 250).OrderBy(a => a.Status).ThenBy(a => a.SubmittedOn).ToList();
        }
    }
}