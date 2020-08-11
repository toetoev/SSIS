using System.Threading.Tasks;
using SSIS.Models;

namespace SSIS.Repositories
{
    public interface IDeptStaffRepository
    {
        Task<bool> DeptRepExist(DeptStaff deptStaff);
    }
}