
﻿using SSIS.Models;
using SSIS.Payloads;
using System.Collections.Generic;
using System.Threading.Tasks;


namespace SSIS.Services
{
    public interface IRequisitionService
    {

        //Task<ApiResponse> UpdateDeptRep(DeptStaff deptStaff);
        // Task<ApiResponse> CreateRequisitionRep(Requisition requisition);
        //  Task<ApiResponse> UpdateRequisition(Requisition requisition);
        //Task<ApiResponse> DeleteRequisitionRep(Requisition requisition);
        //Task<ApiResponse> GetRequisitionRep(Requisition requisition);

        Task<ApiResponse> CreateRequisition(List<RequisitionItem> requisitionItems);

       // Task<ApiResponse> CreateRequisition(Requisition requisitionFromRepo);

    }
}

       
