using System.Threading.Tasks;
using SSIS.Models;
using SSIS.Payloads;

namespace SSIS.Services
{
    public interface IDeptService
    {
        Task<ApiResponse> UpdateCollectionPoint(string currentUser, string collectionPoint);
        Task<ApiResponse> GetCollectionPointByStaff(string currentUser);
    }
}