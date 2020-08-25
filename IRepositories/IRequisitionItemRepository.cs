using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using SSIS.Models;
using SSIS.ViewModel;

namespace SSIS.IRepositories
{
    public interface IRequisitionItemRepository
    {
        Task<int> UpdateRequisitionItems();
        Task<RequisitionItem> GetRequisitionItemByPK(Guid requisitionId, Guid itemId);
        Task<List<TrendViewModel>> GetRequisitionTrend(DateTime startDate, DateTime endDate, string department);
    }
}