﻿using System;
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
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public Guid Id { get; set; }

        public string Name { get; set; }

        public string ContactName { get; set; }

        public string Phone { get; set; }

        public string Fax { get; set; }

        public string GST { get; set; }

        public string Address { get; set; }
    }
}