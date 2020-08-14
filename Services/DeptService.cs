using System.Linq;
using System.Threading.Tasks;
using SSIS.Databases;
using SSIS.Models;
using SSIS.Payloads;
using SSIS.Repositories;

namespace SSIS.Services
{
    public class DeptService : IDeptService
    {
        private readonly IDeptRepository _deptRepository;
        private readonly IDeptStaffRepository _deptStaffRepository;
        public DeptService(IDeptRepository deptRepository, IDeptStaffRepository deptStaffRepository)
        {
            _deptRepository = deptRepository;
            _deptStaffRepository = deptStaffRepository;
        }

        public async Task<ApiResponse> GetCollectionPointByStaff(string currentUser)
        {
            return new ApiResponse { Success = true, Data = await _deptStaffRepository.GetCollectionPointByStaff(currentUser) };
        }

        public async Task<ApiResponse> UpdateCollectionPoint(Department department)
        {
            await _deptRepository.UpdateCollectionPoint(department);
            return new ApiResponse { Success = true };
        }

    }
}