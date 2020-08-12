using Microsoft.EntityFrameworkCore;
using SSIS.Databases;
using SSIS.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SSIS.Repositories
{
    public class DeptStaffRepository : IDeptStaffRepository
    {
        private readonly DataContext _dbContext;

        public DeptStaffRepository(DataContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task<DeptStaff> GetCurrentDeptRep()
        {
            //throw new NotImplementedException();
             return await _dbContext.DeptStaffs.Where(dept => dept.Role ==DeptRole.DeptRep).FirstOrDefaultAsync();
        }
        //public async Task<DeptStaff> GetCurrentDeptRep(String email)
        //{
        //    //throw new NotImplementedException();
        //    return await _dbContext.DeptStaffs.Where(dept => dept.Email == email).FirstOrDefaultAsync();
        //}
        public async Task<DeptStaff> GetDeptStaffFromRepo(DeptStaff deptStaff)
        {
            return await _dbContext.DeptStaffs.Where(ds => ds.Name == deptStaff.Name).FirstOrDefaultAsync();
        }

    }
}
