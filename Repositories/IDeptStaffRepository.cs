using SSIS.Models;
using System.Threading.Tasks;

namespace SSIS.Repositories
{
    public interface IDeptStaffRepository
    {
        Task<DeptStaff> FindDeptRep();
    }
}
