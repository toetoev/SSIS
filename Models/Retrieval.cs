using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Newtonsoft.Json;
using SSIS.Util;

namespace SSIS.Models
{
    public class Retrieval
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public Guid Id { get; set; }

        [Column("CreatedBy")]
        [Required]
        public string CreatedByEmail { get; set; }

        [JsonConverter(typeof(DateFormatConverter))]
        public DateTime CreatedOn { get; set; }

        [ForeignKey("CreatedByEmail")]
        public virtual StoreStaff CreatedBy { get; set; }
        public virtual ICollection<RetrievalItem> RetrievalItems { get; set; }

        [JsonIgnore]
        public virtual ICollection<Requisition> Requisitions { get; set; }
    }
}