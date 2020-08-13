using Microsoft.EntityFrameworkCore;
using SSIS.Databases;
using SSIS.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SSIS.Repositories
{
    public class ReqRepository : IReqRepository
    {
        private readonly DataContext _dbContext;
        public ReqRepository(DataContext dbContext)
        {
            _dbContext = dbContext;
        }
        public async Task<Requisition> CreateRequisition(Requisition requisition)
        {
            await _dbContext.AddAsync(requisition);
            await _dbContext.SaveChangesAsync();
            return requisition;
        }
    }
}

