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
        Task<ApiResponse> CreateAdjustment(string submittedByEmail, List<AdjustmentItem> adjustmentItems);
    }
}