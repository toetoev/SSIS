using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using SSIS.Models;

namespace SSIS.Repositories
{
    public interface ISupplierRepository
    {
        Task<bool> SupplierExist(Guid supplierId);
        Task<Supplier> GetSupplierById(Guid supplierId);
        Task<List<Supplier>> GetAll();
    }
}