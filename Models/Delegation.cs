using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Newtonsoft.Json;
using SSIS.Util;

namespace SSIS.Models
{
    public class Delegation
    {
        [Key]
        public string DelegatedByEmail { get; set; }

        [Key]
        [JsonConverter(typeof(DateFormatConverter))]
        public DateTime StartDate { get; set; }

        public string DelegatedToEmail { get; set; }

        [JsonConverter(typeof(DateFormatConverter))]
        public DateTime EndDate { get; set; }
        public string Comment { get; set; }
        public virtual DeptStaff DelegatedTo { get; set; }
        public virtual DeptStaff DelegatedBy { get; set; }
    }
}