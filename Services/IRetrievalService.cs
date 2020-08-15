using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using SSIS.Payloads;

namespace SSIS.Services
{
    public interface IRetrievalService
    {
        Task<ApiResponse> CreateRetrieval(List<Guid> requisitionIds, string email);
    }
}