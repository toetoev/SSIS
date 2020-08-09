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
        public async Task<User> Login(string nameOrEmail, string pasword)
        {
            var user = await _dbContext.StoreStaffs.FirstOrDefaultAsync(x => (x.Name == nameOrEmail || x.Email == nameOrEmail) && x.Password == pasword); //Get user from database.
            if (user == null)
                return null; // User does not exist.

            return user;
        }

        public async Task<User> Register(User user, string password)
        {
            StoreStaff storeStaff = new StoreStaff(user.Name, user.Email, user.Password, user.Role);
            await _dbContext.StoreStaffs.AddAsync(storeStaff); // Adding the user to context of users.
            await _dbContext.SaveChangesAsync(); // Save changes to database.

            return user;
        }

        public async Task<bool> UserExists(string nameOrEmail)
        {
            if (await _dbContext.StoreStaffs.AnyAsync(x => x.Name == nameOrEmail || x.Email == nameOrEmail))
                return true;
            return false;
        }
    }
}