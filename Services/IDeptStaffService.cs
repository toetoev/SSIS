using System.Threading.Tasks;
using SSIS.Models;
using SSIS.Payloads;

namespace SSIS.Services
{
    public interface IDeptStaffService
    {
        Task<ApiResponse> UpdateDeptRep(string newRepEmail);
        Task<ApiResponse> GetDeptStaffByDeptAndRole(string deptName, string[] roles);
    }
}