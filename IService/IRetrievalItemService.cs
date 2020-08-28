using System.Threading.Tasks;
using SSIS.Payloads;

namespace SSIS.IService
{
    public interface IRetrievalItemService
    {
        Task<ApiResponse> GetAllRetrievalItems(string email);
    }
}