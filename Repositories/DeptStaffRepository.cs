using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using SSIS.Models;
using SSIS.Databases;
using Microsoft.EntityFrameworkCore;

namespace SSIS.Repositories
{
    public class DeptStaffRepository : IDeptStaffRepository
    {
        private readonly DataContext _dbContext;

        public DeptStaffRepository(DataContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task<DeptStaff> FindDeptStaffByName(string name)
        {
            return await _dbContext.DeptStaffs.Where(deptStaff => deptStaff.Name == name).FirstOrDefaultAsync();
        }

        public async Task<DeptStaff> FindDeptRep()
        {
            return await _dbContext.DeptStaffs.Where(deptStaff => deptStaff.Role == DeptRole.DeptRep).FirstOrDefaultAsync();
        }


    }
}
