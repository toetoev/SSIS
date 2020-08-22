using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using SSIS.Databases;
using SSIS.Models;
using SSIS.Payloads;
using SSIS.Repositories;

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
        public async Task<ApiResponse> CreateSupplier(Supplier supplier)
        {
            await _supplierRepository.CreateSupplier(supplier);
            return new ApiResponse { Success = true };

        }


        public async Task<ApiResponse> UpdateSupplier(Guid supplierId)
        {
            if (await _supplierRepository.SupplierExist(supplierId))
            {
                return new ApiResponse { Success = true, Data = await _supplierRepository.GetSupplierById(supplierId) };
            }

            await _supplierRepository.UpdateSupplier();
            return new ApiResponse { Success = true };
        }

    }
}