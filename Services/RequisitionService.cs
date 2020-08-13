using SSIS.Databases;
using SSIS.Models;
using SSIS.Payloads;
using SSIS.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SSIS.Services
{
    public class RequisitionService : IRequisitionService
    {
        private readonly IRequisitionRepository _requisitionRepository;
        private readonly DataContext _dbContext;
        public RequisitionService(IRequisitionRepository requisitionRepository, DataContext dbContext)
        {
            _requisitionRepository = requisitionRepository;
            _dbContext = dbContext;
        }

        public Task<ApiResponse> CreateRequisitionRep(Requisition requisition)
        {
           
        }

        //public async Task<ApiResponse> UpdateRequisition(Requisition requisition)
        //{
        //    Requisition requisitionFromRepo = await _requisitionRepository.GetRequisitionFromRepo(requisition);
        //    if (requisitionFromRepo != null)
        //    {
        //        //Requisition currentDeptRep = await _requisitionRepository.GetCurrentDeptRep(requisitionFromRepo);
        //        //if (currentDeptRep != null)
        //        //{
        //        //    currentDeptRep.Role = DeptRole.Employee;
        //        //}
        //        //requisitionFromRepo.Role = DeptRole.DeptRep;
        //        requisitionFromRepo.RequisitionItems.Clear();
        //        requisitionFromRepo.RequisitionItems = requisition.RequisitionItems;

        //    }
        //    await _dbContext.SaveChangesAsync();
        //    return new ApiResponse { Success = true };
        //}
    }
}
