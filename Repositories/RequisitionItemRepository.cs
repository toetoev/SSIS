using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using SSIS.Databases;
using SSIS.Models;

namespace SSIS.Repositories
{
    public class RequisitionItemRepository : IRequisitionItemRepository
    {
        private readonly DataContext _dbContext;

        public RequisitionItemRepository(DataContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task<RequisitionItem> GetRequisitionItemByPK(Guid requisitionId, Guid itemId)
        {
            return await _dbContext.RequisitionItems.Where(ri => ri.RequisitionId == requisitionId && ri.ItemId == itemId).FirstOrDefaultAsync();
        }

        public async Task<List<RequisitionItem>> GetRequisitionItemByRetrievalIdAndItemId(Guid retrievalId, Guid itemId)
        {
            return await _dbContext.RequisitionItems.Where(ri => ri.ItemId == itemId && ri.Requisition.RetrievalId == retrievalId).ToListAsync();
        }

        public async Task<int> UpdateRequisitionItems()
        {
            return await _dbContext.SaveChangesAsync();
        }
    }
}