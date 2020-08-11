using System.Threading.Tasks;
using SSIS.Models;

namespace SSIS.Repositories
{
    public interface IDeptRepository
    {
        Task<bool> CollectionPointExist(string collectionPointId);
        Task<Department> GetDepartment(string name);
    }
}