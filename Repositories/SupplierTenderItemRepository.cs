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
    public class SupplierTenderItemRepository : ISupplierTenderItemRepository
    {
        private readonly DataContext _dbContext;

        public SupplierTenderItemRepository(DataContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task<List<SupplierTenderItem>> GetSupplierTenderBySupplierId(Guid supplierId)
        {
            return await _dbContext.SupplierTenderItems.Where(sti => sti.SupplierId == supplierId).ToListAsync();
        }

        public async Task<SupplierTenderItem> GetSupplierTenderItemByItemIdAndPriority(Guid itemId, int priority)
        {
            return await _dbContext.SupplierTenderItems.Where(sti => sti.ItemId == itemId && sti.Priority == priority).FirstOrDefaultAsync();
        }
    }
}