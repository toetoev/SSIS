using System.ComponentModel.DataAnnotations;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace SSIS.Models
{
    [ToString]
    public class Requisition
    {
        [Key]
        public string Id { get; set; }

        [Column("DepartmentId")]
        public string DepartmentId { get; set; }

        [ForeignKey("DepartmentId")]
        public virtual Department Department { get; set; }

        [Column("RequestedBy")]
        public string RequestedBy { get; set; }

        [ForeignKey("RequestedBy")]
        public virtual DeptStaff DeptEmployee { get; set; }

        [Column("RequestedOn")]
        public string RequestedOn { get; set; }

        [Column("ReviewedBy")]
        public string ReviewedBy { get; set; }

        [ForeignKey("ReviewedBy")]
        public virtual DeptStaff DeptHead { get; set; }

        [Column("Comment")]
        public string Comment { get; set; }

        [Column("RetrievalId")]
        public string RetrievalId { get; set; }

        [Column("AcknowledgedBy")]
        public string AcknowledgedBy { get; set; }

        [ForeignKey("AcknowledgedBy")]
        public virtual DeptStaff DeptRep { get; set; }

        [Column("Status")]
        public string Status { get; set; }

        [Column("AcknowlegedOn")]
        public string AcknowledgedOn { get; set; }
    }
}
