using SSIS.Models;
using SSIS.Payloads;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SSIS.Services
{
    public interface IDeptStaffService
    {
        Task<ApiResponse> UpdateDeptRep(DeptStaff deptStaff);
    }
}
