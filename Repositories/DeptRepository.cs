using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using SSIS.Databases;
using SSIS.Models;

namespace SSIS.Repositories
{
    public class DeptRepository : IDeptRepository
    {
        private readonly DataContext _dbContext;

        public DeptRepository(DataContext dbContext)
        {
            _dbContext = dbContext;
        }
        public async Task<bool> CollectionPointExist(string collectionPointId)
        {
            if (await _dbContext.CollectionPoints.AnyAsync(x => x.Location == collectionPointId))
                return true;
            return false;
        }
        public async Task<bool> DepartmentExist(string deptName)
        {
            if (await _dbContext.Departments.AnyAsync(x => x.Name == deptName))
                return true;
            return false;
        }

        public async Task<string> GetCollectionPoint(string deptName)
        {
            return await _dbContext.Departments.Where(dept => dept.Name == deptName).Select(dept => dept.CollectionPointId).SingleOrDefaultAsync();
        }

        public async Task<Department> GetDepartment(string name)
        {
            return await _dbContext.Departments.Where(dept => dept.Name == name).FirstOrDefaultAsync();
        }
        public async Task<int> UpdateCollectionPoint(Department department)
        {
            Department departmentFromRepo = await GetDepartment(department.Name);
            if (departmentFromRepo != null)
                if (department.CollectionPointId != null && await CollectionPointExist(department.CollectionPointId))
                    departmentFromRepo.CollectionPointId = department.CollectionPointId;
            return await _dbContext.SaveChangesAsync();
        }
    }
}