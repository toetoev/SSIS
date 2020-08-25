using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using SSIS.Models;

namespace SSIS.IRepositories
{
    public interface ISupplierRepository
    {
        Task<bool> SupplierExist(string supplierName);
        Task<Supplier> GetSupplierById(Guid supplierId);
        Task<List<Supplier>> GetAll();
        Task<int> CreateSupplier(Supplier supplier);
        Task<List<Supplier>> GetAllSuppliers();
        Task<int> UpdateSupplier();
        Task<int> DeleteSupplier(Supplier supplier);
        Task<bool> SupplierExistById(Guid id);
    }
}