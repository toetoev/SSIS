using System.Threading.Tasks;
using SSIS.Models;
using SSIS.Payloads;

namespace SSIS.Services
{
    public interface IDelegationService
    {
        Task<ApiResponse> GetDelegationByDeptHeadEmail(string delegatedByEmail);
    }
}