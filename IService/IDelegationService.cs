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
        Task<ApiResponse> UpdateDelegation(Delegation delegation, Guid delegationId, string delegatedByEmail);
        Task<ApiResponse> DeleteDelegation(Guid delegationId);
    }
}