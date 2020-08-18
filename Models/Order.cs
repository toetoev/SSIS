using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Newtonsoft.Json;
using SSIS.Utils;

namespace SSIS.Models
{
    public class Order
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public Guid Id { get; set; }
        public Guid SupplierId { get; set; }
        public virtual Supplier Supplier { get; set; }

        [JsonConverter(typeof(DateFormatConverter))]
        public DateTime OrderedOn { get; set; }

        [Required]
        public string OrderedByEmail { get; set; }
        public virtual StoreStaff OrderedBy { get; set; }

        [JsonConverter(typeof(DateFormatConverter))]
        public Nullable<DateTime> ReceivedOn { get; set; }
        public string ReceivedByEmail { get; set; }
        public virtual StoreStaff ReceivedBy { get; set; }
        public OrderStatus Status { get; set; }
        public virtual ICollection<OrderItem> OrderItems { get; set; }
    }
}