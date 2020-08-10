using System.ComponentModel.DataAnnotations;

namespace SSIS.Models
{
    public class CollectionPoint
    {
        [Key]
        public string Location { get; set; }
    }
}