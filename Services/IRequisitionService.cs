using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using SSIS.Models;
using SSIS.Payloads;

namespace SSIS.Services
{
    public interface IRequisitionService
    {
        Task<ApiResponse> CreateRequisition(List<RequisitionItem> requisitionItems, DeptStaff deptStaff);
        Task<ApiResponse> GetRequisitionsByRole(string role);
    }
}