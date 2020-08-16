using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace SSIS.Models
{
    public class Item
    {
        public Item(string bin, string description, string uoM, int reorderLevel, int reorderQty, Category category)
        {
            Id = Guid.NewGuid();
            Bin = bin;
            Description = description;
            UoM = uoM;
            ReorderLevel = reorderLevel;
            ReorderQty = reorderQty;
            Category = category;
        }
        public Item()
        {

        }

        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        [JsonIgnore]
        public Guid Id { get; set; }
        public string Bin { get; set; }
        public string Description { get; set; }
        public string UoM { get; set; }
        public int ReorderLevel { get; set; }
        public int ReorderQty { get; set; }
        public int Stock { get; set; }

        public string CategoryName { get; set; }
        public virtual Category Category { get; set; }

        [JsonIgnore]
        public virtual ICollection<RequisitionItem> RequisitionItems { get; set; }

        [JsonIgnore]
        public virtual ICollection<SupplyTenderItem> SupplyTenderItems { get; set; }

        [JsonIgnore]
        public virtual ICollection<RetrievalItem> RetrievalItems { get; set; }

        [JsonIgnore]
        public virtual ICollection<OrderItem> OrderItems { get; set; }
    }
}