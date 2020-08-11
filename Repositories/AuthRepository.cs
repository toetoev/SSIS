using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using SSIS.Databases;
using SSIS.Models;

namespace SSIS.Repositories
{
    public class AuthRepository : IAuthRepository
    {
        private readonly DataContext _dbContext;
        public AuthRepository(DataContext dbContext)
        {
            _dbContext = dbContext;
        }
        public async Task<User> Login(string nameOrEmail, string pasword, string role)
        {
            if (role.Equals("STORE"))
                return await _dbContext.StoreStaffs.FirstOrDefaultAsync(x => (x.Name == nameOrEmail || x.Email == nameOrEmail) && x.Password == pasword);
            else if (role.Equals("DEPARTMENT"))
                return await _dbContext.DeptStaffs.FirstOrDefaultAsync(x => (x.Name == nameOrEmail || x.Email == nameOrEmail) && x.Password == pasword);
            return null;
        }
    }
}