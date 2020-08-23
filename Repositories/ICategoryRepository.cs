using System.Collections.Generic;
using System.Threading.Tasks;
using SSIS.Models;

namespace SSIS.Repositories
{
    public interface ICategoryRepository
    {
        Task<bool> CategoryExist(string name);
        Task<List<Category>> GetAll();
        Task<Category> GetCategoryByName(string name);
    }
}