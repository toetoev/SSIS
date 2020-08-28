using System.Threading.Tasks;
using SSIS.Models;
using SSIS.Payloads;

namespace SSIS.IService
{
    public interface IDeptService
    {
        Task<ApiResponse> UpdateCollectionPoint(string currentUser, string collectionPoint);
        Task<ApiResponse> GetCollectionPointByStaff(string currentUser);
        Task<ApiResponse> GetAllDepartment();
    }
}