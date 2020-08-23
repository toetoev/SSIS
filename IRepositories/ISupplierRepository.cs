using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using SSIS.Models;

namespace SSIS.IRepositories
{
    public interface ISupplierRepository
    {
        Task<bool> SupplierExist(Guid supplierId);
        Task<Supplier> GetSupplierById(Guid supplierId);
        Task<List<Supplier>> GetAll();
    }
}