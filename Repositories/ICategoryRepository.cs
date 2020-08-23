using System.Threading.Tasks;
using SSIS.Models;

namespace SSIS.Repositories
{
    public interface ICategoryRepository
    {
        Task<bool> CategoryExist(string categoryName);
    }
}