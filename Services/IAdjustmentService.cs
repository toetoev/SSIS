using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using SSIS.Models;
using SSIS.Payloads;

namespace SSIS.Services
{
    public interface IAdjustmentService
    {
        Task<ApiResponse> GetAllAdjustments();
        Task<ApiResponse> CreateAdjustment(string submittedByEmail, Adjustment adjustment);
        Task<ApiResponse> ReviewAdjustment(Guid adjustmentId, AdjustmentStatus status, string email);
        Task<ApiResponse> DeleteAdjustment(Guid adjustmentId, string deletedByemail);
    }
}