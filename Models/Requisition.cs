using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Newtonsoft.Json;
using SSIS.Utils;

namespace SSIS.Models
{
    [ToString]
    public class Requisition
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public Guid Id { get; set; }

        [JsonConverter(typeof(DateFormatConverter))]
        public DateTime RequestedOn { get; set; }

        [JsonConverter(typeof(DateFormatConverter))]
        public Nullable<DateTime> ReviewedOn { get; set; }
        public string Comment { get; set; }

        [JsonConverter(typeof(DateFormatConverter))]
        public Nullable<DateTime> AcknowledgedOn { get; set; }
        public RequisitionStatus Status { get; set; }

        [Required]
        public string DepartmentName { get; set; }

        public virtual Department Department { get; set; }

        [Required]
        public string RequestedByEmail { get; set; }
        public virtual DeptStaff RequestedBy { get; set; }
        public string ReviewedByEmail { get; set; }
        public virtual DeptStaff ReviewedBy { get; set; }
        public string AcknowledgedByEmail { get; set; }
        public virtual DeptStaff AcknowledgedBy { get; set; }
        public virtual ICollection<RequisitionItem> RequisitionItems { get; set; }

        [ForeignKey("RetrievalId")]
        public Guid? RetrievalId { get; set; }

        [JsonIgnore]
        public virtual Retrieval Retrieval { get; set; }
    }
}