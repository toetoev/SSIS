using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using SSIS.Models;
using SSIS.Payloads;

namespace SSIS.IService
{
    public interface ISupplierService
    {
        Task<ApiResponse> GetAllSuppliers();
        Task<ApiResponse> GetSupplierById(Guid supplierId);
        Task<ApiResponse> CreateSupplier(Supplier supplier);
        Task<ApiResponse> UpdateSupplier(Guid supplierId, Supplier supplier);
        Task<ApiResponse> DeleteSupplier(Guid supplierId);
    }
}