using System.Collections.Generic;
using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

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

        public virtual Ilection<DeptStaff> DeptStaffs { get; set; }
    }
}