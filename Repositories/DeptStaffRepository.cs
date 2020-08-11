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

        public async Task<DeptStaff> FindDeptRep()
        {
            DbSet<DeptStaff> deptStaffs = _dbContext.DeptStaffs;
            return await deptStaffs.Where(deptStaff => deptStaff.Name == "Metro Boomin").FirstOrDefaultAsync();
        }
    }
}
