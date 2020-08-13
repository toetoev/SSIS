using System.Threading.Tasks;
using SSIS.Models;

namespace SSIS.Repositories
{
    public interface IRequisitionRepository
    {
        Task<Requisition> CreateRequisition(Requisition requisition);
    }
}