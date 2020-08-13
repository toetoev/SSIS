<<<<<<< HEAD
﻿using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.ChangeTracking;
using SSIS.Databases;
using SSIS.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
=======
using System.Threading.Tasks;
using SSIS.Databases;
using SSIS.Models;
>>>>>>> master

namespace SSIS.Repositories
{
    public class RequisitionRepository : IRequisitionRepository
<<<<<<< HEAD

=======
>>>>>>> master
    {
        private readonly DataContext _dbContext;
        public RequisitionRepository(DataContext dbContext)
        {
            _dbContext = dbContext;
        }
<<<<<<< HEAD


        //public async Task<Requisition> GetCurrentDeptRep(Requisition requisitionFromRepo)
        //{
        //    return await _dbContext.Requisitions.Where(ds => ds.Requisitions.Name == requisitionFromRepo.Requisitions.Name && ds.Role == DeptRole.DeptRep).FirstOrDefaultAsync();
        //}

        public async Task<List<Requisition>> GetRequisitionFromRepo()
        {
            return await _dbContext.Requisitions.ToListAsync();
        }

        //public async Task<Requisition> GetRequisition(Requisition requisitionFromRepo) {

        //         return await _dbContext.Requisitions.Where(ds => ds.Id == requisitionFromRepo.Id).FirstOrDefaultAsync();
        //}
        //public void CreateRequisition(Requisition requisitionFromRepo)
        //{
        //    //throw new NotImplementedException();
        //    _dbContext.Requisitions.Add(requisitionFromRepo);
        //    //EntityEntry<Requisition> xx = _dbContext.Requisitions.Add(requisitionFromRepo);
        //}

        //public void UpdateRequisition(Requisition requisitionFromRepo)
        //{
        //    _dbContext.Requisitions.Update(requisitionFromRepo);
        //}

        //public void DeleteRequisition(Requisition requisitionFromRepo)
        //{
        //    //throw new NotImplementedException();
        //    _dbContext.Requisitions.Remove(requisitionFromRepo);
        //} 

    }
}
=======
        public async Task<Requisition> CreateRequisition(Requisition requisition)
        {
            throw new System.NotImplementedException();
        }
    }
}
>>>>>>> master
