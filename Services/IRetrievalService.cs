using SSIS.Models;
using SSIS.Payloads;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SSIS.Services
{
    public interface IRetrievalService
    {
        Task<ApiResponse> CreateRetrieval(List<Guid> requisitionIds, string email);
        Task<ApiResponse> GetAllRetrievals();
        Task<ApiResponse> DeleteRetrieval(Guid retrievalId);
    }
}
