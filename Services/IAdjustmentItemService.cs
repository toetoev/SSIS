using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using SSIS.Models;
using SSIS.Payloads;

namespace SSIS.Services
{
    public interface IAdjustmentItemService
    {
        Task<ApiResponse> UpdateAdjustmentItems(Guid adjustmentId, List<AdjustmentItem> adjustmentItems, string submittedByEmail);
    }
}