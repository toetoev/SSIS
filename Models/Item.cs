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
        public string Id { get; set; }

        [Column("Bin")]
        public string Bin { get; set; }

        [Column("Description")]
        public string Description { get; set; }

        [Column("UOM")]
        public string UOM { get; set; }

        [Column("SupplierId1")]
        public string SupplierId1 { get; set; }

        [ForeignKey("SupplierId1")]
        public virtual Supplier Supplier1 { get; set; }

        [Column("SupplierId2")]
        public string SupplierId2 { get; set; }

        [ForeignKey("SupplierId2")]
        public virtual Supplier Supplier2 { get; set; }

        [Column("SupplierId3")]
        public string SupplierId3 { get; set; }

        [ForeignKey("SupplierId3")]
        public virtual Supplier Supplier3 { get; set; }
    }
}
