using System.Threading.Tasks;
using SSIS.Models;

namespace SSIS.Repositories
{
    public interface IStoreStaffRepository
    {
        Task<StoreStaff> GetStoreStaffByEmail(string email);
    }
}