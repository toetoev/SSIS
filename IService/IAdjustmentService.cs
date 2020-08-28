using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using SSIS.Models;
using SSIS.Payloads;

namespace SSIS.IService
{
    public interface IAdjustmentService
    {
        Task<ApiResponse> GetAllAdjustments();
        Task<ApiResponse> CreateAdjustment(string submittedByEmail, List<AdjustmentItem> adjustmentItems);
        Task<ApiResponse> ReviewAdjustment(Guid adjustmentId, AdjustmentStatus status, string email);
        Task<ApiResponse> DeleteAdjustment(Guid adjustmentId, string deletedByemail);
        Task<ApiResponse> GetAdjustmentByStoreStaff(string email);
    }
}