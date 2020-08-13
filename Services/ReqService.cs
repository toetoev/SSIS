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
        private readonly IItemRepository _itemRepository;

        public ReqService(IDeptRepository deptRepository,
                          IDeptStaffRepository deptStaffRepository,
                          IReqRepository reqRepository,
                          IItemRepository itemRepository)
        {
            _deptRepository = deptRepository;
            _deptStaffRepository = deptStaffRepository;
            _reqRepository = reqRepository;
            _itemRepository = itemRepository;
        }

        public async Task<ApiResponse> CreateReq(List<RequisitionItem> rList, DeptStaff ds)
        {
            DeptStaff requestedBy = await _deptStaffRepository.GetDeptStaffFromRepo(ds);
            Requisition requisition = new Requisition { Id = Guid.NewGuid(),
                                                        RequestedOn = DateTime.Now,
                                                        Status = RequisitionStatus.APPLIED,
                                                        RequestedBy = requestedBy,
                                                        Department = requestedBy.Department,
                                                        };

            foreach (var r in rList)
            {
               r.RequisitionId = requisition.Id;
            }

            requisition.RequisitionItems = rList;
            if (await _reqRepository.CreateRequisition(requisition) != null)
                return new ApiResponse { Success = true };
            return new ApiResponse { Success = false, Message = "Create Requisition List Failed" };
        }
    }
}