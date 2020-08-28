using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using SSIS.Models;
using SSIS.Payloads;

namespace SSIS.IRepositories
{
    public interface IRetrievalRepository
    {
        Task<int> CreateRetrieval(Retrieval retrieval);
        Task<List<Retrieval>> GetAllByCurrentStaff(string currentStaffEmail);
        Task<Retrieval> GetRetrievalById(Guid id);
        Task<int> DeleteRetrieval(Retrieval retrieval);
        Task<int> UpdateRetrieval();
    }
}