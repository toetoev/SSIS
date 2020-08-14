
﻿using SSIS.Databases;
using SSIS.Models;
using SSIS.Payloads;
using SSIS.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

using System.Collections.Generic;
using System.Threading.Tasks;
using SSIS.Models;
using SSIS.Payloads;
using SSIS.Repositories;


namespace SSIS.Services
{
    public class RequisitionService : IRequisitionService
    {
        private readonly IRequisitionRepository _requisitionRepository;
        private readonly IDeptStaffRepository _deptStaffRepository;


        public RequisitionService(IRequisitionRepository requisitionRepository, IDeptStaffRepository deptStaffRepository)
        {
            _requisitionRepository = requisitionRepository;
            _deptStaffRepository = deptStaffRepository;

        }

        //public async Task<ApiResponse> CreateRequisition(Requisition requisitionFromRepo)
        //{
        //    //DeptStaff deptStaff = new DeptStaff();

        //    //deptStaff.Email = "meka@gmail.com";

        //    //Requisition requisition = new Requisition
        //    //{
        //    //    Id = Guid.NewGuid(),
        //    //    RequestedOn = DateTime.Now,
        //    //    Comment = "EmployeeComment",
        //    //    Status = RequisitionStatus.APPLIED,
        //    //    RequestedBy = await _deptStaffRepository.GetDeptStaffFromRepo(deptStaff)

        //    //};
        //    requisitionFromRepo.Id = Guid.NewGuid();
        //    requisitionFromRepo.RequestedBy = await _deptStaffRepository.GetDeptStaffFromRepo(requisitionFromRepo.RequestedBy);
        //    foreach (var i in requisitionFromRepo.RequisitionItems)
        //    {
        //        i.RequisitionId = requisitionFromRepo.Id;
        //    }

        //    //requisition.RequisitionItems = requisitionItems;

        //    if (await _requisitionRepository.CreateRequisition(requisitionFromRepo) != null)
        //        return new ApiResponse { Success = true };
        //    return new ApiResponse { Success = false, Message = "Create Requisition List Failed" };
        //}
        public async Task<ApiResponse> CreateRequisition(List<RequisitionItem> requisitionItems)
        {
            DeptStaff deptStaff = new DeptStaff();

            deptStaff.Email = "meka@gmail.com";

            Requisition requisition = new Requisition
            {
                Id = Guid.NewGuid(),
                RequestedOn = DateTime.Now,
                Comment = "EmployeeComment",
                Status = RequisitionStatus.APPLIED,
                RequestedBy = await _deptStaffRepository.GetDeptStaffFromRepo(deptStaff)

            };

            foreach (var i in requisitionItems)
            {
                i.RequisitionId = requisition.Id;
            }

            requisition.RequisitionItems = requisitionItems;

            if (await _requisitionRepository.CreateRequisition(requisition) != null)
                return new ApiResponse { Success = true };
            return new ApiResponse { Success = false, Message = "Create Requisition List Failed" };
        }
    }
}


