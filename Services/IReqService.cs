using SSIS.Models;
using SSIS.Payloads;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SSIS.Services
{
    public interface IReqService
    {
        Task<ApiResponse> CreateRequisition(Requisition req);
        Task<ApiResponse> RetreiveRequisition();
    }
}
