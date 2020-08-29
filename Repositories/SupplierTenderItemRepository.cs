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
            List<SupplierTenderItem> supplierTenderItems = await _dbContext.SupplierTenderItems.Where(sti => sti.SupplierId == supplierId).ToListAsync();
            foreach (var supplierTenderItem in supplierTenderItems)
            {
                supplierTenderItem.Description = supplierTenderItem.Item.Description;
                supplierTenderItem.UoM = supplierTenderItem.Item.UoM;
            }
            return supplierTenderItems.OrderBy(sti => sti.Description).ToList();
        }

        public async Task<SupplierTenderItem> GetSupplierTenderItemByItemIdAndPriority(Guid itemId, int priority)
        {
            return await _dbContext.SupplierTenderItems.Where(sti => sti.ItemId == itemId && sti.Priority == priority).FirstOrDefaultAsync();
        }
    }
}