using System.Linq;
using System.Threading.Tasks;
using SSIS.Databases;
using SSIS.IRepositories;
using SSIS.IService;
using SSIS.Models;
using SSIS.Payloads;

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

        public async Task<ApiResponse> GetAllDepartment()
        {
            return new ApiResponse { Success = true, Data = await _deptRepository.GetAllDepartment() };
        }

        public async Task<ApiResponse> GetCollectionPointByStaff(string currentUser)
        {
            return new ApiResponse { Success = true, Data = await _deptStaffRepository.GetCollectionPointByStaff(currentUser) };
        }

        public async Task<ApiResponse> UpdateCollectionPoint(string currentUser, string collectionPoint)
        {
            DeptStaff deptStaff = await _deptStaffRepository.GetDeptStaffByEmail(currentUser);
            if (await _deptRepository.CollectionPointExist(collectionPoint))
            {
                deptStaff.Department.CollectionPointId = collectionPoint;
                await _deptRepository.UpdateCollectionPoint();
            }
            else
                return new ApiResponse { Success = false, Message = "Collection point chosen doesn't exist" };
            return new ApiResponse { Success = true };
        }
    }
}