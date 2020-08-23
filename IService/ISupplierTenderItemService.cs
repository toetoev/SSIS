using System;
using System.Threading.Tasks;
using SSIS.Payloads;

namespace SSIS.IService
{
    public interface ISupplierTenderItemService
    {
        Task<ApiResponse> GetSupplierTenderByItemId(Guid itemId);
    }
}