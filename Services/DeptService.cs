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
        private readonly DataContext _dbContext;
        public DeptService(IDeptRepository deptRepository, IDeptStaffRepository deptStaffRepository, DataContext dbContext)
        {
            _deptRepository = deptRepository;
            _deptStaffRepository = deptStaffRepository;
            _dbContext = dbContext;
        }

        public async Task<ApiResponse> UpdateCollectionPoint(Department department)
        {
            System.Console.WriteLine(department);
            Department departmentFromRepo = await _deptRepository.GetDepartment(department.Name);
            if (departmentFromRepo != null)
                if (department.CollectionPointId != null && await _deptRepository.CollectionPointExist(department.CollectionPointId))
                    departmentFromRepo.CollectionPointId = department.CollectionPointId;
            await _dbContext.SaveChangesAsync();
            return new ApiResponse { Success = true };
        }

        // if (department.DeptStaffs != null && department.DeptStaffs.SingleOrDefault() != null && await _deptStaffRepository.DeptRepExist(department.DeptStaffs.SingleOrDefault()))
        //         {
        //             DeptStaff oldRep = departmentFromRepo.DeptStaffs.Where(ds => ds.Role == DeptRole.DeptRep).FirstOrDefault();
        //             if (oldRep != null)
        //                 oldRep.Role = DeptRole.Employee;
        //             DeptStaff newRep = departmentFromRepo.DeptStaffs.Where(ds => ds.Email == department.DeptStaffs.Single().Email).FirstOrDefault();
        //             newRep.Role = DeptRole.DeptRep;
        //         }
        //         else
        //         {
        //             System.Console.WriteLine("DeptRep does not Exist");
        //         }
    }
}