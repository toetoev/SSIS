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
        Task<ApiResponse> UpdateAdjustment(Guid adjustmentId, List<AdjustmentItem> adjustmentItems, string submittedByEmail);
    }
}