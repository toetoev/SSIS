using System.Collections.Generic;
using System.Threading.Tasks;
using SSIS.Models;

namespace SSIS.IRepositories
{
    public interface ICategoryRepository
    {
        Task<bool> CategoryExist(string categoryName);
        Task<List<Category>> GetAll();
        Task<Category> GetCategoryByName(string name);
    }
}