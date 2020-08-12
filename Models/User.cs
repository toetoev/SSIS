using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace SSIS.Models
{
    [ToString]
    public class User
    {
        [Key]
        [EmailAddress]
        public string Email { get; set; }

        [MaxLength(36)]
        public string Name { get; set; }

        public string Password { get; set; }

        public string Role { get; set; }
    }
}