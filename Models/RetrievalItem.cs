using System;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace SSIS.Models
{
    public class RetrievalItem
    {
        [Key]
        public Guid ItemId { get; set; }

        [Key]
        public Guid RetrievalId { get; set; }
        public int TotalQtyNeeded { get; set; }
        public int TotalQtyRetrieved { get; set; }

        [JsonIgnore]
        public virtual Item Item { get; set; }

        [JsonIgnore]
        public virtual Retrieval Retrieval { get; set; }
    }
}