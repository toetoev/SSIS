using System;
using System.ComponentModel.DataAnnotations;
using Newtonsoft.Json;

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

        [JsonIgnore]
        public virtual Requisition Requisition { get; set; }
    }
}