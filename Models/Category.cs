using System.ComponentModel.DataAnnotations;

namespace SSIS.Models
{
    public class Category
    {
        [Key]
        public string Name { get; set; }
    }
}