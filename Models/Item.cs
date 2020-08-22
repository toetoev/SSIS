using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;
using Newtonsoft.Json;

namespace SSIS.Models
{
    public class Item
    {
        public Item(string bin, string description, string uoM, int reorderLevel, int reorderQty, int stock, Category category)
        {
            Id = Guid.NewGuid();
            Bin = bin;
            Description = description;
            UoM = uoM;
            ReorderLevel = reorderLevel;
            ReorderQty = reorderQty;
            Stock = stock;
            Category = category;
        }
        public Item() { }

        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public Guid Id { get; set; }

        [Required]
        public string Bin { get; set; }

        [Required]
        public string Description { get; set; }

        [Required]
        public string UoM { get; set; }

        [Required]
        [Range(1, Double.PositiveInfinity)]
        public int ReorderLevel { get; set; }

        [Required]
        [Range(1, Double.PositiveInfinity)]
        public int ReorderQty { get; set; }

        [Required]
        public int Stock { get; set; }
        public string CategoryName { get; set; }
        public virtual Category Category { get; set; }

        [JsonIgnore]
        public virtual ICollection<RequisitionItem> RequisitionItems { get; set; }

        public virtual ICollection<SupplierTenderItem> SupplyTenderItems { get; set; }

        [JsonIgnore]
        public virtual ICollection<RetrievalItem> RetrievalItems { get; set; }

        [JsonIgnore]
        public virtual ICollection<OrderItem> OrderItems { get; set; }
    }
}