using System.Threading.Tasks;
using SSIS.Models;

namespace SSIS.Repositories
{
    public interface IAuthRepository
    {
        Task<User> Register(User user, string password);
        Task<User> Login(string nameOrEmail, string pasword);
        Task<bool> UserExists(string nameOrEmail);
    }
}