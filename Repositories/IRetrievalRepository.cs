using System.Threading.Tasks;
using SSIS.Models;

namespace SSIS.Repositories
{
    public interface IRetrievalRepository
    {
        Task<int> CreateRetrieval(Retrieval retrieval);
    }
}