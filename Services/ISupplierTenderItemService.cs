using System;
using System.Threading.Tasks;
using SSIS.Payloads;

namespace SSIS.Services
{
    public interface ISupplierTenderItemService
    {
        Task<ApiResponse> GetSupplierTenderByItemId(Guid itemId);
    }
}