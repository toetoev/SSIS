using System;
using System.ComponentModel.DataAnnotations;
using Newtonsoft.Json;

namespace SSIS.Models
{
    public class SupplyTenderItem
    {
        [Key]
        public Guid ItemId { get; set; }

        [Key]
        public Guid SupplierId { get; set; }
        public int Price { get; set; }

        [Range(1, 3)]
        public int Priority { get; set; }

        [JsonIgnore]
        public virtual Item Item { get; set; }

        public virtual Supplier Supplier { get; set; }
    }
}