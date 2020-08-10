using System.Threading.Tasks;
using SSIS.Models;
using SSIS.Payloads;

namespace SSIS.Services
{
    public interface IDeptService
    {
        Task<ApiResponse> UpdateCollectionPointAndDeptRep(Department department);
    }
}