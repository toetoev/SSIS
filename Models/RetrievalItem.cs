using System;
using System.ComponentModel.DataAnnotations;

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
        public virtual Item Item { get; set; }
        public virtual Retrieval Retrieval { get; set; }
    }
}