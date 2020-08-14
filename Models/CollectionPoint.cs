using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace SSIS.Models
{
    public class CollectionPoint
    {
        [Key]
        public string Location { get; set; }

        [JsonIgnore]
        public virtual ICollection<Department> Departments { get; set; }
    }
}