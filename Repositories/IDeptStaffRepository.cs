using System.Collections.Generic;
using System.Threading.Tasks;
using SSIS.Models;

namespace SSIS.Repositories
{
    public interface IDeptStaffRepository
    {
        Task<bool> DeptRepExist(DeptStaff deptStaff);
        Task<DeptStaff> GetCurrentDeptRep(DeptStaff deptStaffFromRepo);
        Task<DeptStaff> GetDeptStaffByEmail(string email);
        Task UpdateDeptStaff();
        Task<List<DeptStaff>> GetDeptStaffByDeptAndRole(string deptName, string[] roles);
        Task<string> GetCollectionPointByStaff(string deptStaff);
    }
}