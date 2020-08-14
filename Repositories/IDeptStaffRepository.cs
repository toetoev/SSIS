using System.Collections.Generic;
using System.Threading.Tasks;
using SSIS.Models;

namespace SSIS.Repositories
{
    public interface IDeptStaffRepository
    {
        Task<bool> DeptRepExist(DeptStaff deptStaff);
        Task<DeptStaff> GetCurrentDeptRep(DeptStaff deptStaffFromRepo);
        Task<DeptStaff> GetDeptStaffByEmail(DeptStaff deptStaff);
        Task UpdateDeptRep(DeptStaff deptStaff);
        Task<List<DeptStaff>> GetDeptStaffByDeptAndRole(string deptName, string[] roles);
        Task<string> GetCollectionPointByStaff(string deptStaff);
    }
}