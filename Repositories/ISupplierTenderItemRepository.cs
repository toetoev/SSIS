using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using SSIS.Models;

namespace SSIS.Repositories
{
    public interface ISupplierTenderItemRepository
    {
        Task<List<SupplierTenderItem>> GetSupplierTenderByItemId(Guid itemId);
    }
}