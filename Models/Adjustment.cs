using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Newtonsoft.Json;
using SSIS.Utils;

namespace SSIS.Models
{
    public class Adjustment
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public Guid Id { get; set; }

        [JsonConverter(typeof(DateFormatConverter))]
        public DateTime SubmittedOn { get; set; }
        public string SubmittedByEmail { get; set; }
        public virtual StoreStaff SubmittedBy { get; set; }

        [JsonConverter(typeof(DateFormatConverter))]
        public Nullable<DateTime> IssuedOn { get; set; }
        public string IssuedByEmail { get; set; }
        public virtual StoreStaff IssuedBy { get; set; }
        public AdjustmentStatus Status { get; set; }
        public virtual ICollection<AdjustmentItem> AdjustmentItems { get; set; }

    }
}