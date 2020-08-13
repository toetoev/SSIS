using SSIS.Models;
using SSIS.Payloads;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SSIS.Services
{
    public interface IRequisitionService
    {
        //Task<ApiResponse> UpdateDeptRep(DeptStaff deptStaff);
        Task<ApiResponse> CreateRequisitionRep(Requisition requisition);
      //  Task<ApiResponse> UpdateRequisition(Requisition requisition);
        //Task<ApiResponse> DeleteRequisitionRep(Requisition requisition);
        //Task<ApiResponse> GetRequisitionRep(Requisition requisition);


    }
}
