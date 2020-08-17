using SSIS.Models;
using SSIS.Payloads;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SSIS.Repositories
{
    public interface IRetrievalRepository
    {
        Task<int> CreateRetrieval(Retrieval retrieval);
        Task<List<Retrieval>> GetAll();
        Task<Retrieval> GetRetrievalById(Guid id);
        Task<int> DeleteRetrieval(Retrieval retrieval);
    }
}
