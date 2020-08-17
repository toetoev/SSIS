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
        public async Task<ApiResponse> GetDeptStaffByDeptAndRole(string email, string[] roles)
        {
            DeptStaff deptStaffFromRepo = await _deptStaffRepository.GetDeptStaffByEmail(email);
            return new ApiResponse { Success = true, Data = await _deptStaffRepository.GetDeptStaffByDeptAndRole(deptStaffFromRepo.Department.Name, roles) };
        }
        public async Task<ApiResponse> UpdateDeptRep(string newRepEmail)
        {
            DeptStaff deptStaffFromRepo = await _deptStaffRepository.GetDeptStaffByEmail(newRepEmail);
            if (deptStaffFromRepo != null)
            {
                DeptStaff currentDeptRep = await _deptStaffRepository.GetCurrentDeptRep(deptStaffFromRepo);
                if (currentDeptRep != null)
                {
                    currentDeptRep.Role = DeptRole.Employee;
                }
                deptStaffFromRepo.Role = DeptRole.DeptRep;
            }
            else
                return new ApiResponse { Success = false, Message = "New department staff assigned as department rep doesn't exist" };
            await _deptStaffRepository.UpdateDeptStaff();
            return new ApiResponse { Success = true };
        }
    }
}