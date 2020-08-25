using System.Collections.Generic;
using System.Threading.Tasks;
using SSIS.Models;

namespace SSIS.IRepositories
{
    public interface IDeptRepository
    {
        Task<bool> CollectionPointExist(string collectionPointId);
        Task<bool> DepartmentExist(string deptName);
        Task<Department> GetDepartment(string name);
        Task<int> UpdateCollectionPoint();
        Task<List<Department>> GetAllDepartment();
    }
}