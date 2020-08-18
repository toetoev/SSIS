using System.Threading.Tasks;
using SSIS.Payloads;

namespace SSIS.Services
{
    public interface IRetrievalItemService
    {

        Task<ApiResponse> GetAllRetrievalItems(string email);
    }
}