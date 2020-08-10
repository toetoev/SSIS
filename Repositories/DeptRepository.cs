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
            System.Console.WriteLine(collectionPointId);
            if (await _dbContext.CollectionPoints.AnyAsync(x => x.Location == collectionPointId))
                return true;
            return false;
        }

        public async Task<bool> DeptRepExist(Department department)
        {
            if (await _dbContext.DeptStaffs.AnyAsync(x => x.Email == department.DeptRepId && x.Department.Name == department.Name))
                return true;
            return false;
        }

        public async Task<int> UpdateDept(Department department)
        {
            Department departmentFromRepo = await _dbContext.Departments.FirstOrDefaultAsync(x => x.Name == department.Name);
            if (departmentFromRepo != null)
            {
                departmentFromRepo.CollectionPointId = department.CollectionPointId;
                departmentFromRepo.DeptRepId = department.DeptRepId;
            }
            return await _dbContext.SaveChangesAsync();
        }
    }
}