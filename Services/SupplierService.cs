using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using SSIS.Databases;
using SSIS.IRepositories;
using SSIS.IService;
using SSIS.Models;
using SSIS.Payloads;

namespace SSIS.Services
{
    public class SupplierService : ISupplierService
    {
        private readonly ISupplierRepository _supplierRepository;

        public SupplierService(ISupplierRepository supplierRepository)
        {
            _supplierRepository = supplierRepository;
        }

        public async Task<ApiResponse> GetAllSuppliers()
        {
            return new ApiResponse { Success = true, Data = await _supplierRepository.GetAll() };
        }

        public async Task<ApiResponse> GetSupplierById(Guid supplierId)
        {
            if (await _supplierRepository.SupplierExist(supplierId))
            {
                return new ApiResponse { Success = true, Data = await _supplierRepository.GetSupplierById(supplierId) };
            }
            return new ApiResponse { Success = false, Message = "supplier does not exist" };

        }
    }
}