using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using SSIS.Models;
using SSIS.Payloads;

namespace SSIS.Services
{
    public interface IDelegationService
    {
        Task<ApiResponse> GetDelegationByDeptHeadEmail(string delegatedByEmail);
        Task<ApiResponse> CreateDelegation(Delegation delegation, string delegatedByEmail);
        Task<ApiResponse> UpdateDelegation(Delegation delegation, string delegatedByEmail);
        Task<ApiResponse> DeleteDelegation(DateTime startDate, string delegatedByEmail);
    }
}