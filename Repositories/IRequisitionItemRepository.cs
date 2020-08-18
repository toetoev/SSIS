using System;
using System.Threading.Tasks;
using SSIS.Models;

namespace SSIS.Repositories
{
    public interface IRequisitionItemRepository
    {
        Task<int> UpdateRequisitionItems();
        Task<RequisitionItem> GetRequisitionItemByPK(Guid requisitionId, Guid itemId);
    }
}