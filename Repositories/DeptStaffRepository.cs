using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using SSIS.Models;
using SSIS.Databases;

namespace SSIS.Repositories
{
    public class DeptStaffRepository : IDeptStaffRepository
    {
        private readonly DataContext _dbContext;

        public DeptStaffRepository(DataContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task<DeptStaff> ()
        {
            return await _dbContext.DeptStaffs.Where(deptStaff => deptStaff.Role == DeptRole.DeptRep).FirstOrDefaultAsync();
        }
    }
}
