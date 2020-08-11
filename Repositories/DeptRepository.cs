using System.Linq;
using Microsoft.EntityFrameworkCore;
using System.Threading.Tasks;
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

        public async Task<Department> GetDepartment(string name)
        {
            return await _dbContext.Departments.Where(dept => dept.Name == name).FirstOrDefaultAsync();
        }
    }
}