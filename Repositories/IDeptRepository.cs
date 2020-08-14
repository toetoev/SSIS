using System.Threading.Tasks;
using SSIS.Models;

namespace SSIS.Repositories
{
    public interface IDeptRepository
    {
        Task<bool> CollectionPointExist(string collectionPointId);
        Task<bool> DepartmentExist(string deptName);
        Task<Department> GetDepartment(string name);
        Task<int> UpdateCollectionPoint(Department department);
    }
}