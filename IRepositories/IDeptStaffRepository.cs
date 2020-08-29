using System.Collections.Generic;
using System.Threading.Tasks;
using SSIS.Models;

namespace SSIS.IRepositories
{
    public interface IDeptStaffRepository
    {
        Task<DeptStaff> GetCurrentDeptRep(DeptStaff deptStaffFromRepo);
        Task<DeptStaff> GetDeptStaffByEmail(string email);
        Task UpdateDeptStaff();
        Task<List<DeptStaff>> GetDeptStaffByDeptAndRole(string deptName, string[] roles);
        Task<string> GetCollectionPointByStaff(string deptStaff);
    }
}