using System;
using System.Threading.Tasks;
using SSIS.Payloads;

namespace SSIS.IService
{
    public interface ICategoryService
    {
        Task<ApiResponse> GetAllCategories();
        Task<ApiResponse> GetCategoryById(string name);
    }
}