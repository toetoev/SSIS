using System.Threading.Tasks;
using SSIS.Models;
using SSIS.Payload;

namespace SSIS.Services
{
    public interface IAuthService
    {
        Task<ApiResponse> Register(User user);
        Task<string> Login(User user);
    }
}