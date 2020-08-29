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
    public class SupplierRepository : ISupplierRepository
    {
        private readonly DataContext _dbContext;

        public SupplierRepository(DataContext dbContext) => _dbContext = dbContext;

        public async Task<List<Supplier>> GetAll() => await _dbContext.Suppliers.OrderBy(s => s.Name).ToListAsync();

        public async Task<Supplier> GetSupplierById(Guid supplierId) => await _dbContext.Suppliers.Where(s => s.Id == supplierId).FirstOrDefaultAsync();

        public async Task<bool> SupplierExist(string supplierName) => await _dbContext.Suppliers.AnyAsync(s => s.Name == supplierName);

        public async Task<int> CreateSupplier(Supplier supplier)
        {
            _dbContext.Add(supplier);
            return await _dbContext.SaveChangesAsync();
        }

        public async Task<int> UpdateSupplier() => await _dbContext.SaveChangesAsync();

        public async Task<int> DeleteSupplier(Supplier supplier)
        {
            _dbContext.Suppliers.Remove(supplier);
            return await _dbContext.SaveChangesAsync();
        }

        public async Task<bool> SupplierExistById(Guid id) => await _dbContext.Suppliers.AnyAsync(s => s.Id == id);

        public async Task<bool> SupplierNameExist(string name) => await _dbContext.Suppliers.AnyAsync(s => s.Name == name);
    }
}