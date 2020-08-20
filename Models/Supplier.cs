using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Newtonsoft.Json;

namespace SSIS.Models
{
    public class Supplier
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public Guid Id { get; set; }
        public string Name { get; set; }
        public string ContactName { get; set; }
        public string Phone { get; set; }
        public string Fax { get; set; }
        public string GST { get; set; }
        public string Address { get; set; }

        public virtual ICollection<SupplyTenderItem> SupplyTenderItems { get; set; }
    }
}