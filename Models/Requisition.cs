
using SSIS.Models;
using System;
using System.Collections.Generic;

using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

using System.Linq;
using System.Threading.Tasks;

namespace SSIS.Models
{
[ToString]
public class Requisition
{
    [Key]
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public Guid Id { get; set; }
    public DateTime RequestedOn { get; set; }
    public DateTime ReviewedOn { get; set; }
    public string Comment { get; set; }
    public DateTime AcknowledgedOn { get; set; }
    public RequisitionStatus Status { get; set; }
    public virtual Department Department { get; set; }
    public string RequestedByEmail { get; set; }
    public virtual DeptStaff RequestedBy { get; set; }
    public string ReviewedByEmail { get; set; }
    public virtual DeptStaff ReviewedBy { get; set; }
    public string AcknowledgedByEmail { get; set; }
    public virtual DeptStaff AcknowledgedBy { get; set; }
    public virtual ICollection<RequisitionItem> RequisitionItems { get; set; }
}
}
