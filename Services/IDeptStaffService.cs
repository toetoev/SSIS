using SSIS.Models;
using SSIS.Payloads;
using System.Threading.Tasks;

namespace SSIS.Services
{
    public interface IDeptStaffService
    {
        Task<ApiResponse> UpdateDeptRep(DeptStaff deptStaff);
    }
}
