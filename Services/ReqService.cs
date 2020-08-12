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
    public class ReqService : IReqService
    {
        private readonly IDeptRepository _deptRepository;
        private readonly IDeptStaffRepository _deptStaffRepository;
        private readonly IReqRepository _reqRepository;

        private readonly DataContext _dbContext;

        public ReqService(DataContext dbContext, IDeptRepository deptRepository, IDeptStaffRepository deptStaffRepository, IReqRepository reqRepository)
        {
            _dbContext = dbContext;
            _deptRepository = deptRepository;
            _deptStaffRepository = deptStaffRepository;
            _reqRepository = reqRepository;
        }

        public async Task<ApiResponse> RetreiveRequisition()
        {
            return new ApiResponse { Success = true, Data = await _reqRepository.GetAllReqsFromRepository()};
        }

        public async Task<ApiResponse> CreateRequisition(Requisition req)
        {
            Requisition newReq = new Requisition { Id = Guid.NewGuid(),
                                                   RequestedOn = DateTime.Now,
                                                   Comment = req.Comment,
                                                   Status = RequisitionStatus.APPLIED,
                                                   Department = await _deptRepository.GetDepartment(req.Department.Name),
                                                   RequestedBy = await _deptStaffRepository.GetDeptStaffFromRepo(req.RequestedBy) };
            await _dbContext.AddAsync(newReq);
            await _dbContext.SaveChangesAsync();
            return new ApiResponse { Success = true };
        }
    }
}
