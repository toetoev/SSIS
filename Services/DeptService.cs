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
        public DeptService(IDeptRepository deptRepository)
        {
            _deptRepository = deptRepository;
        }

        public async Task<ApiResponse> GetCollectionPoint(string deptName)
        {
            if (await _deptRepository.DepartmentExist(deptName))
            {
                return new ApiResponse { Success = true, Data = await _deptRepository.GetCollectionPoint(deptName) };
            }
            return new ApiResponse { Success = false };
        }

        public async Task<ApiResponse> UpdateCollectionPoint(Department department)
        {
            await _deptRepository.UpdateCollectionPoint(department);
            return new ApiResponse { Success = true };
        }

    }
}