using System.Threading.Tasks;
using SSIS.Databases;
using SSIS.Models;

namespace SSIS.Repositories
{
    public class RequisitionRepository : IRequisitionRepository
    {
        private readonly DataContext _dbContext;
        public RequisitionRepository(DataContext dbContext)
        {
            _dbContext = dbContext;
        }
        public async Task<Requisition> CreateRequisition(Requisition requisition)
        {
            throw new System.NotImplementedException();
        }
    }
}