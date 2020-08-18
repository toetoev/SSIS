using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using SSIS.Databases;
using SSIS.Models;

namespace SSIS.Repositories
{
    public class SupplierRepository : ISupplierRepository
    {
        private readonly DataContext _dbContext;

        public SupplierRepository(DataContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task<List<Supplier>> GetAll()
        {
            return await _dbContext.Suppliers.OrderBy(s => s.Name).ToListAsync();
        }

        public async Task<Supplier> GetSupplierById(Guid supplierId)
        {
            return await _dbContext.Suppliers.Where(s => s.Id == supplierId).FirstOrDefaultAsync();
        }

        public async Task<bool> SupplierExist(Guid supplierId)
        {
            return await _dbContext.Suppliers.AnyAsync(s => s.Id == supplierId);
        }
    }
}