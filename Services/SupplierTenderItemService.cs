using System;
using System.Threading.Tasks;
using SSIS.Payloads;
using SSIS.Repositories;

namespace SSIS.Services
{
    public class SupplierTenderItemService : ISupplierTenderItemService
    {
        private readonly ISupplierTenderItemRepository _supplierTenderItemRepository;

        public SupplierTenderItemService(ISupplierTenderItemRepository supplierTenderItemRepository)
        {
            _supplierTenderItemRepository = supplierTenderItemRepository;
        }

        public async Task<ApiResponse> GetSupplierTenderByItemId(Guid itemId)
        {
            return new ApiResponse { Success = true, Data = await _supplierTenderItemRepository.GetSupplierTenderByItemId(itemId) };
        }
    }
}