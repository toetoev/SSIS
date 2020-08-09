using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace SSIS.Models
{
    [ToString]
    public class User
    {
        [Key]
        [MaxLength(36)]
        public string Name { get; set; }

        [EmailAddress]
        public string Email { get; set; }

        [Required]
        [MaxLength(50)]
        public string Password { get; set; }

        [Required]
        public string Role { get; set; }
    }
}