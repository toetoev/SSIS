using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using SSIS.Models;
using SSIS.Payloads;

namespace SSIS.IService
{
    public interface IDelegationService
    {
        Task<ApiResponse> GetDelegation(string deptStaffEmail);
        Task<ApiResponse> CreateDelegation(Delegation delegation, string delegatedByEmail);
        Task<ApiResponse> UpdateDelegation(Delegation delegation, string delegatedByEmail);
        Task<ApiResponse> DeleteDelegation(DateTime startDate, string delegatedByEmail);
    }
}