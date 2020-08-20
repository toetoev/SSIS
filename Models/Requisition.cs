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
        public Requisition() { }
        public Requisition(Guid id, DateTime requestedOn, DateTime? reviewedOn, string comment, DateTime? acknowledgedOn, RequisitionStatus status, string departmentName, Department department, string requestedByEmail, DeptStaff requestedBy, string reviewedByEmail, DeptStaff reviewedBy, string acknowledgedByEmail, DeptStaff acknowledgedBy, ICollection<RequisitionItem> requisitionItems, Guid? retrievalId)
        {
            Id = id;
            RequestedOn = requestedOn;
            ReviewedOn = reviewedOn;
            Comment = comment;
            AcknowledgedOn = acknowledgedOn;
            Status = status;
            DepartmentName = departmentName;
            Department = department;
            RequestedByEmail = requestedByEmail;
            RequestedBy = requestedBy;
            ReviewedByEmail = reviewedByEmail;
            ReviewedBy = reviewedBy;
            AcknowledgedByEmail = acknowledgedByEmail;
            AcknowledgedBy = acknowledgedBy;
            RetrievalId = retrievalId;
            RequisitionItems = requisitionItems;
        }

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