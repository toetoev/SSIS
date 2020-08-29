using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using SSIS.Databases;
using SSIS.IRepositories;
using SSIS.Models;

namespace SSIS.Repositories
{
    public class DeptRepository : IDeptRepository
    {
        private readonly DataContext _dbContext;

        public DeptRepository(DataContext dbContext) => _dbContext = dbContext;
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

        public async Task<List<Department>> GetAllDepartment() => await _dbContext.Departments.OrderBy(d => d.Name).ToListAsync();

        public async Task<Department> GetDepartment(string name) => await _dbContext.Departments.Where(dept => dept.Name == name).FirstOrDefaultAsync();
        public async Task<int> UpdateCollectionPoint() => await _dbContext.SaveChangesAsync();
    }
}