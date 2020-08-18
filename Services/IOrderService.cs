using System.Threading.Tasks;
using SSIS.Payloads;

namespace SSIS.Controllers
{
    public interface IOrderService
    {
        Task<ApiResponse> GetAllOrders();
    }
}