using System;
using System.ComponentModel.DataAnnotations;

namespace SSIS.Models
{
    public class OrderItem
    {
        [Key]
        public Guid ItemId { get; set; }

        [Key]
        public Guid OrderId { get; set; }
        public int OrderedQty { get; set; }
        public int DeliveredQty { get; set; }
        public string Remarks { get; set; }
        public virtual Item Item { get; set; }
        public virtual Order Order { get; set; }
    }
}