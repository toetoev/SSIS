using System.Collections.Generic;
using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace SSIS.Models
{
    [ToString]
    public class Department
    {
        //[DatabaseGenerated(DatabaseGeneratedOption.Identity)]

        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public string Id { get; set; }

        public string Name { get; set; }

        [Column("CollectionPointId")]
        public string CollectionPointId { get; set; }

        [ForeignKey("CollectionPointId")]
        public virtual CollectionPoint CollectionPoint { get; set; }

        public virtual ICollection<DeptStaff> DeptStaffs { get; set; }
    }
}