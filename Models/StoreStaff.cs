using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace SSIS.Models
{
    public class StoreStaff : User
    {
        public StoreStaff(string name, string email, string password, string role)
        {
            base.Name = name;
            base.Email = email;
            base.Password = password;
            base.Role = role;
        }
    }
}
