using System.Linq;
using System.Threading.Tasks;
using SSIS.Databases;
using SSIS.Models;
using SSIS.Payloads;
using SSIS.Repositories;

namespace SSIS.Services
{
    public class DeptStaffService : IDeptStaffService
    {
        private readonly IDeptStaffRepository _deptStaffRepository;
        public DeptStaffService(IDeptStaffRepository deptStaffRepository)
        {
            _deptStaffRepository = deptStaffRepository;
        }
        public async Task<ApiResponse> UpdateDeptRep(DeptStaff deptStaff)
        {
            await _deptStaffRepository.UpdateDeptRep(deptStaff);
            return new ApiResponse { Success = true };
        }
    }
}