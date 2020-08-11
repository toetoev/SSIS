using System.Threading.Tasks;
using SSIS.Models;

namespace SSIS.Repositories
{
    public interface IAuthRepository
    {
        Task<User> Login(string nameOrEmail, string pasword, string role);
    }
}