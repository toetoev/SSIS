using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace SSIS.Models
{
    [ToString]
    public class Department
    {
        [Key]
        public string Name { get; set; }

        [Column("CollectionPointId")]
        public string CollectionPointId { get; set; }

        [ForeignKey("CollectionPointId")]
        public virtual CollectionPoint CollectionPoint { get; set; }

        [JsonIgnore]
        public virtual ICollection<DeptStaff> DeptStaffs { get; set; }

        public virtual ICollection<Requisition> Requisitions { get; set; }
    }
}