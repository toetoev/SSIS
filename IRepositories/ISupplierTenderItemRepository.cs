using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using SSIS.Models;

namespace SSIS.IRepositories
{
    public interface ISupplierTenderItemRepository
    {
        Task<List<SupplierTenderItem>> GetSupplierTenderBySupplierId(Guid supplierId);
    }
}