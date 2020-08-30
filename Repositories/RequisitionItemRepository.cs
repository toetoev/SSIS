using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using SSIS.Databases;
using SSIS.IRepositories;
using SSIS.Models;
using SSIS.ViewModel;

namespace SSIS.Repositories
{
    public class RequisitionItemRepository : IRequisitionItemRepository
    {
        private readonly DataContext _dbContext;

        public RequisitionItemRepository(DataContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task<RequisitionItem> GetRequisitionItemByPK(Guid requisitionId, Guid itemId) => await _dbContext.RequisitionItems.Where(ri => ri.RequisitionId == requisitionId && ri.ItemId == itemId).FirstOrDefaultAsync();

        public async Task<List<TrendViewModel>> GetRequisitionTrend(DateTime startDate, DateTime endDate, string department)
        {
            List<RequisitionItem> validRequisitionItems = await _dbContext.RequisitionItems
                .Where(ri => ri.Requisition.RequestedOn.Month.CompareTo(startDate.Month) >= 0 && ri.Requisition.RequestedOn.Month.CompareTo(endDate.Month) <= 0)
                .Where(ri => department == ri.Requisition.DepartmentName).ToListAsync();
            List<TrendViewModel> requisitionTrends = new List<TrendViewModel>();
            List<Category> categories = new List<Category>();
            foreach (var requisitionItem in validRequisitionItems)
            {
                if (categories.Contains(requisitionItem.Item.Category))
                    continue;
                else
                    categories.Add(requisitionItem.Item.Category);
            }
            foreach (var category in categories)
            {
                var tmp = validRequisitionItems
                    .Where(ri => ri.Item.CategoryName == category.Name)
                    .GroupBy(ri => ri.Requisition.RequestedOn.Month)
                    .Select(g => new { RequestedOn = g.Key, TotalQty = g.Sum(g => g.Need) }).ToList();
                List<int> monthlyTotalQty = new List<int>();
                for (int i = startDate.Month; i <= endDate.Month; i++)
                {
                    var tmpTotalQty = tmp.Where(t => t.RequestedOn == i).FirstOrDefault();
                    if (tmpTotalQty != null)
                        monthlyTotalQty.Add(tmpTotalQty.TotalQty);
                    else
                        monthlyTotalQty.Add(0);
                }
                requisitionTrends.Add(new TrendViewModel { Category = category.Name, MonthlyTotalQty = monthlyTotalQty });
            }
            return requisitionTrends;
        }

        public async Task<int> UpdateRequisitionItems()
        {
            return await _dbContext.SaveChangesAsync();
        }
    }
}