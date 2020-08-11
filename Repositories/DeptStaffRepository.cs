using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using SSIS.Databases;
using SSIS.Models;

namespace SSIS.Repositories
{
    public class DeptStaffRepository : IDeptStaffRepository
    {
        private readonly DataContext _dbContext;

        public DeptStaffRepository(DataContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task<bool> DeptRepExist(DeptStaff deptStaff)
        {
            if (await _dbContext.DeptStaffs.AnyAsync(x => x.Email == deptStaff.Email && x.Department.Name == deptStaff.Department.Name))
                return true;
            return false;
        }
    }
}