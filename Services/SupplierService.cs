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
            return new ApiResponse { Success = true, Data = await _supplierRepository.GetSupplierById(supplierId) };
        }
        public async Task<ApiResponse> CreateSupplier(Supplier supplier)
        {
            if (!await _supplierRepository.SupplierExist(supplier.Name))
            {
                return new ApiResponse { Success = true, Data = await _supplierRepository.CreateSupplier(supplier) };
            }
            return new ApiResponse { Success = false, Message = "Supplier with the same name already exists" };
        }
        public async Task<ApiResponse> UpdateSupplier(Guid supplierId, Supplier supplier)
        {
            Supplier supplierFromRepo = await _supplierRepository.GetSupplierById(supplier.Id);
            if (supplierFromRepo != null)
            {
                supplierFromRepo.Name = supplier.Name;
                supplierFromRepo.ContactName = supplier.ContactName;
                supplierFromRepo.Phone = supplier.Phone;
                supplierFromRepo.Fax = supplier.Fax;
                supplierFromRepo.GST = supplier.GST;
                supplierFromRepo.Address = supplier.Address;

                if (!await _supplierRepository.SupplierExist(supplier.Name))
                {
                    return new ApiResponse { Success = true, Data = await _supplierRepository.UpdateSupplier() };
                }
                return new ApiResponse { Success = false, Message = "Supplier with the same name already exists" };
            }
            return new ApiResponse { Success = false, Message = "Supplier does not exist" };
        }

        public async Task<ApiResponse> DeleteSupplier(Guid supplierId)
        {
            Supplier supplierFromRepo = await _supplierRepository.GetSupplierById(supplierId);
            if (supplierFromRepo != null)
            {
                return new ApiResponse { Success = true, Data = await _supplierRepository.DeleteSupplier(supplierFromRepo) };
            }
            return new ApiResponse { Success = false, Message = "Supplier does not exist" };
        }
    }
}