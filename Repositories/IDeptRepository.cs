using System.Threading.Tasks;
using SSIS.Models;

namespace SSIS.Repositories
{
    public interface IDeptRepository
    {
        Task<bool> CollectionPointExist(string collectionPointId);
        Task<bool> DeptRepExist(Department department);
        Task<int> UpdateDept(Department department);
    }
}