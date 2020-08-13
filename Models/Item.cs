using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace SSIS.Models
{
    public class Item
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public Guid Id { get; set; }
        public string Bin { get; set; }
        public string Description { get; set; }
        public string UoM { get; set; }
        public int ReorderLevel { get; set; }
        public int ReorderQty { get; set; }
        public int Stock { get; set; }
        public virtual Category Category { get; set; }
        public virtual ICollection<RequisitionItem> RequisitionItems { get; set; }
        public virtual ICollection<SupplyTenderItem> SupplyTenderItems { get; set; }
        public virtual ICollection<RetrievalItem> RetrievalItems { get; set; }
        public virtual ICollection<OrderItem> OrderItems { get; set; }

    }
}