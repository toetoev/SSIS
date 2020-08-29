using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Newtonsoft.Json;

namespace SSIS.Models
{
    public class SupplierTenderItem
    {
        public SupplierTenderItem(double price, int priority, Guid itemId, Guid supplierId)
        {
            Price = price;
            Priority = priority;
            ItemId = itemId;
            SupplierId = supplierId;
        }

        [Key]
        public Guid ItemId { get; set; }

        [Key]
        public Guid SupplierId { get; set; }
        public double Price { get; set; }

        [Range(1, 3)]
        public int Priority { get; set; }

        [NotMapped]
        public string Description { get; set; }

        [NotMapped]
        public string UoM { get; set; }

        [JsonIgnore]
        public virtual Item Item { get; set; }

        public virtual Supplier Supplier { get; set; }
    }
}