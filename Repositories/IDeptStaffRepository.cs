using SSIS.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SSIS.Repositories
{
    public interface IDeptStaffRepository
    {
        Task<DeptStaff> findDeptRep();
    }
}
