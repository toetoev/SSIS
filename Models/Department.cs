using System.Collections.Generic;
using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace SSIS.Models
{
    public class Department
    {
        [Key]
        public string Name { get; set; }

        [Column("CollectionPointId")]
        public string CollectionPointId { get; set; }

        [ForeignKey("CollectionPointId")]
        public virtual CollectionPoint CollectionPoint { get; set; }

        [Column("DeptRepId")]
        public string DeptRepId { get; set; }

        [ForeignKey("DeptRepId")]
        public virtual DeptStaff DeptRep { get; set; }
        public virtual ICollection<DeptStaff> DeptStaffs { get; set; }
    }
}