using SSIS.Databases;
using SSIS.Models;
using SSIS.Payloads;
using SSIS.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SSIS.Services
{
    public class DeptStaffService : IDeptStaffService
    {

        private readonly IDeptStaffRepository _deptStaffRepository;

        private readonly DataContext _dbContext;

        public DeptStaffService(IDeptStaffRepository deptStaffRepository, DataContext dbContext)
        {
            _deptStaffRepository = deptStaffRepository;
            _dbContext = dbContext;
        }

        public async Task<ApiResponse> UpdateDeptRep(DeptStaff deptStaff)
        {
            DeptStaff deptRepOld = await _deptStaffRepository.FindDeptRep();
            if (deptRepOld != null)
                deptRepOld.Role = DeptRole.Employee;
                DeptStaff deptRepNew = await _deptStaffRepository.FindDeptStaffByName(deptStaff.Name);
                await _dbContext.SaveChangesAsync();
            return new ApiResponse { Success = true };
        }
    }
}
