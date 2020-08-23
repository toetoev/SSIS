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
    }
}