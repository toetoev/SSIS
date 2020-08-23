using System;
using System.Threading.Tasks;
using SSIS.Payloads;

namespace SSIS.Services
{
    public interface ICategoryService
    {
        Task<ApiResponse> GetAllCategories();
        Task<ApiResponse> GetCategoryById(string name);
    }
}