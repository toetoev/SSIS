using System.Threading.Tasks;
using SSIS.Models;
using SSIS.Payloads;

namespace SSIS.IService
{
    public interface IAuthService
    {
        Task<ApiResponse> Login(User user);
    }
}