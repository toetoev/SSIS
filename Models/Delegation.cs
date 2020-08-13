using System;
using System.ComponentModel.DataAnnotations;

namespace SSIS.Models
{
    public class Delegation
    {
        [Key]
        public string DelegatedByEmail { get; set; }

        [Key]
        public DateTime StartDate { get; set; }
        public string DelegatedToEmail { get; set; }
        public DateTime EndDate { get; set; }
        public string Comment { get; set; }
        public virtual DeptStaff DelegatedTo { get; set; }
        public virtual DeptStaff DelegatedBy { get; set; }
    }
}