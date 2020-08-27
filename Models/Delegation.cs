using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Newtonsoft.Json;
using SSIS.Utils;

namespace SSIS.Models
{
    public class Delegation
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public Guid Id { get; set; }

        public string DelegatedByEmail { get; set; }

        [JsonConverter(typeof(DateConverter))]
        public DateTime StartDate { get; set; }
        public string DelegatedToEmail { get; set; }

        [JsonConverter(typeof(DateConverter))]
        public DateTime EndDate { get; set; }
        public string Comment { get; set; }
        public virtual DeptStaff DelegatedTo { get; set; }
        public virtual DeptStaff DelegatedBy { get; set; }
    }
}