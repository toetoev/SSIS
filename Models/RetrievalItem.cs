using System;
using System.ComponentModel.DataAnnotations;
using Newtonsoft.Json;

namespace SSIS.Models
{
    [ToString]
    public class RetrievalItem
    {
        [Key]
        public Guid ItemId { get; set; }

        [Key]
        public Guid RetrievalId { get; set; }
        public int TotalQtyNeeded { get; set; }
        public int TotalQtyRetrieved { get; set; }
        public virtual Item Item { get; set; }

        [JsonIgnore]
        public virtual Retrieval Retrieval { get; set; }
    }
}