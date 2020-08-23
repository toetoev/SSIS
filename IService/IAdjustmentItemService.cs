using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using SSIS.Models;
using SSIS.Payloads;

namespace SSIS.IService
{
    public interface IAdjustmentItemService
    {
        Task<ApiResponse> UpdateAdjustmentItems(Guid adjustmentId, List<AdjustmentItem> adjustmentItems, string submittedByEmail);
    }
}