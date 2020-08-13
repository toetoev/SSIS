using System.Threading.Tasks;
using SSIS.Models;
using SSIS.Payloads;

namespace SSIS.Services
{
    public interface IDeptService
    {
        Task<ApiResponse> UpdateCollectionPoint(Department department);
        Task<ApiResponse> GetCollectionPoint(string deptName);
    }
}