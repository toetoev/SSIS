using System.Threading.Tasks;
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

        public async Task<ApiResponse> UpdateCollectionPointAndDeptRep(Department department)
        {
            if (await _deptRepository.CollectionPointExist(department.CollectionPointId))
            // if (await _deptRepository.DeptRepExist(department))
            {
                await _deptRepository.UpdateDept(department);
                return new ApiResponse { Success = true };
            }
            // else
            //     return new ApiResponse { Success = false, Message = "Department Rep specified doesn't exist" };
            else
                return new ApiResponse { Success = false, Message = "Collection Point specified doesn't exist" };



        }
    }
}