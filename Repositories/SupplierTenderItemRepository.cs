using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using SSIS.Databases;
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

        public async Task<List<SupplierTenderItem>> GetSupplierTenderByItemId(Guid itemId)
        {
            return await _dbContext.SupplyTenderItems.Where(sti => sti.ItemId == itemId).ToListAsync();
        }
    }
}