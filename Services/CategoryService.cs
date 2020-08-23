using System.Threading.Tasks;
using SSIS.Payloads;
using SSIS.Repositories;

namespace SSIS.Services
{
    public class CategoryService : ICategoryService
    {
        private readonly ICategoryRepository _categoryRepository;

        public CategoryService(ICategoryRepository categoryRepository)
        {
            _categoryRepository = categoryRepository;
        }

        public async Task<ApiResponse> GetAllCategories()
        {
            return new ApiResponse { Success = true, Data = await _categoryRepository.GetAll() };

        }

        public async Task<ApiResponse> GetCategoryById(string name)
        {
            return new ApiResponse { Success = true, Data = await _categoryRepository.GetCategoryByName(name) };
        }
    }
}