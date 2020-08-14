using System;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace SSIS.Models
{
    public class AdjustmentItem
    {
        [Key]
        public Guid ItemId { get; set; }

        [Key]
        public Guid AdjustmentId { get; set; }
        public int AdjustedQty { get; set; }
        public string Reason { get; set; }

        public virtual Item Item { get; set; }

        [JsonIgnore]
        public virtual Adjustment Adjustment { get; set; }
    }
}