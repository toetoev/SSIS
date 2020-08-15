using System.Threading.Tasks;
using SSIS.Databases;
using SSIS.Models;

namespace SSIS.Repositories
{
    public class RetrievalRepository : IRetrievalRepository
    {
        private readonly DataContext _dbContext;

        public RetrievalRepository(DataContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task<int> CreateRetrieval(Retrieval retrieval)
        {
            await _dbContext.Retrievals.AddAsync(retrieval);
            return await _dbContext.SaveChangesAsync();
        }
    }
}