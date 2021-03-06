using System;
using System.ComponentModel.DataAnnotations;
using Newtonsoft.Json;

namespace SSIS.Models
{
    [ToString]
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

        [JsonIgnore]
        public virtual Order Order { get; set; }
    }
}