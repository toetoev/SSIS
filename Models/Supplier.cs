using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace SSIS.Models
{
    public class Supplier
    {
        [Key]
        public string Id { get; set; }

        [Column("Name")]
        public string Name { get; set; }

        [Column("ContactName")]
        public string ContactName { get; set; }

        [Column("Phone")]
        public string Phone { get; set; }

        [Column("Fax")]
        public string Fax { get; set; }

        [Column("GST")]
        public string GST { get; set; }

        [Column("Address")]
        public string Address { get; set; }
    }
}