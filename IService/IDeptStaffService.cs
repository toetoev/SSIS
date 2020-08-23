using System.Threading.Tasks;
using SSIS.Models;
using SSIS.Payloads;

namespace SSIS.IService
{
    public interface IDeptStaffService
    {
        Task<ApiResponse> UpdateDeptRep(string newRepEmail);
        Task<ApiResponse> GetDeptStaffByDeptAndRole(string email, string[] roles);
    }
}