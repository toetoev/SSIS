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
        private readonly DataContext _dbContext;
        public DeptStaffService(IDeptStaffRepository deptStaffRepository, DataContext dbContext)
        {
            _deptStaffRepository = deptStaffRepository;
            _dbContext = dbContext;
        }

        public async Task<ApiResponse> UpdateDeptRep(DeptStaff deptStaff)
        {
            DeptStaff deptStaffFromRepo = _dbContext.DeptStaffs.Where(ds => ds.Email == deptStaff.Email).FirstOrDefault();
            if (deptStaffFromRepo != null)
            {
                DeptStaff oldRep = _dbContext.DeptStaffs.Where(ds => ds.Department.Name == deptStaffFromRepo.Department.Name && ds.Role == DeptRole.DeptRep).FirstOrDefault();
                if (oldRep != null)
                {
                    oldRep.Role = DeptRole.Employee;
                }
                deptStaffFromRepo.Role = DeptRole.DeptRep;
            }
            await _dbContext.SaveChangesAsync();
            return new ApiResponse { Success = true };
        }
    }
}