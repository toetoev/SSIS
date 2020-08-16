using System.Threading.Tasks;
using SSIS.Models;
using SSIS.Payloads;

namespace SSIS.Services
{
    public interface IAuthService
    {
        Task<ApiResponse> Login(User user);
    }
}