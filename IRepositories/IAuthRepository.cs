using System.Threading.Tasks;
using SSIS.Models;

namespace SSIS.IRepositories
{
    public interface IAuthRepository
    {
        Task<User> Login(string nameOrEmail, string pasword, string role);
    }
}