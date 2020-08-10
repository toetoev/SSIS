using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
namespace SSIS.Models
{
    public class DeptStaff : User
    {
        public virtual Department Department { get; set; }

        [Column("ReportTo")]
        public string ReportToId { get; set; }

        [ForeignKey("ReportToId")]
        public virtual DeptStaff ReportTo { get; set; }
    }
}