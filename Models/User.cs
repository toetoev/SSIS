using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace SSIS.Models
{
    [ToString]
    public class User
    {
        [Key]
        [EmailAddress]
        public string Email { get; set; }

        [MaxLength(36)]
        [Required]
        public string Name { get; set; }

        [MaxLength(50)]
        [Required]
        public string Password { get; set; }

        public string Role { get; set; }
    }
}