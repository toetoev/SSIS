using System;
using System.Threading.Tasks;
using SSIS.IRepositories;
using SSIS.IService;
using SSIS.Payloads;

namespace SSIS.Services
{
    public class SupplierTenderItemService : ISupplierTenderItemService
    {
        private readonly ISupplierTenderItemRepository _supplierTenderItemRepository;

        public SupplierTenderItemService(ISupplierTenderItemRepository supplierTenderItemRepository)
        {
            _supplierTenderItemRepository = supplierTenderItemRepository;
        }

        public async Task<ApiResponse> GetSupplierTenderBySupplierId(Guid supplierId)
        {
            return new ApiResponse { Success = true, Data = await _supplierTenderItemRepository.GetSupplierTenderBySupplierId(supplierId) };
        }
    }
}