using System.Collections.Generic;
using System.Linq;
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
        public async Task<DeptStaff> GetCurrentDeptRep(DeptStaff deptStaffFromRepo)
        {
            return await _dbContext.DeptStaffs.Where(ds => ds.Department.Name == deptStaffFromRepo.Department.Name && ds.Role == DeptRole.DeptRep).FirstOrDefaultAsync();
        }
        public async Task<DeptStaff> GetDeptStaffByEmail(string email)
        {
            return await _dbContext.DeptStaffs.Where(ds => ds.Email == email).FirstOrDefaultAsync();
        }
        public async Task<List<DeptStaff>> GetDeptStaffByDeptAndRole(string deptName, string[] roles)
        {
            return await _dbContext.DeptStaffs.Where(ds => ds.Department.Name == deptName && roles.Contains(ds.Role)).ToListAsync();
        }
        public async Task UpdateDeptStaff()
        {
            await _dbContext.SaveChangesAsync();
        }

        public async Task<string> GetCollectionPointByStaff(string deptStaff)
        {
            DeptStaff deptStaffFromRepo = await _dbContext.DeptStaffs.Where(ds => ds.Email == deptStaff).SingleAsync();
            return deptStaffFromRepo.Department.CollectionPointId;
        }
    }
}