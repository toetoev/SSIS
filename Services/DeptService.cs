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
        private readonly DataContext _dbContext;
        public DeptService(IDeptRepository deptRepository, DataContext dbContext)
        {
            _deptRepository = deptRepository;
            _dbContext = dbContext;
        }

        public async Task<ApiResponse> UpdateCollectionPoint(Department department)
        {
            Department departmentFromRepo = await _deptRepository.GetDepartment(department.Name);
            if (departmentFromRepo != null)
                if (department.CollectionPointId != null && await _deptRepository.CollectionPointExist(department.CollectionPointId))
                    departmentFromRepo.CollectionPointId = department.CollectionPointId;
            await _dbContext.SaveChangesAsync();
            return new ApiResponse { Success = true };
        }
    }
}