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
            DeptStaff deptStaffFromRepo = await _deptStaffRepository.GetDeptStaffFromRepo(deptStaff);
            if (deptStaffFromRepo != null)
            {
                DeptStaff currentDeptRep = await _deptStaffRepository.GetCurrentDeptRep();
                if (currentDeptRep != null)
                {
                    currentDeptRep.Role = DeptRole.Employee;
                }
                deptStaffFromRepo.Role = DeptRole.DeptRep;
            }
            await _dbContext.SaveChangesAsync();
            return new ApiResponse { Success = true };
        }
    }
}
