using System;
using System.ComponentModel.DataAnnotations;

namespace SSIS.Models
{
    [ToString]
    public class RequisitionItem
    {
        [Key]
        public Guid ItemId { get; set; }

        [Key]
        public Guid RequisitionId { get; set; }
        public int Need { get; set; }
        public int Actual { get; set; }
        public virtual Item Item { get; set; }
        public virtual Requisition Requisition { get; set; }
    }
}