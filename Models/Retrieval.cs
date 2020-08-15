using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
namespace SSIS.Models
{
    public class Retrieval
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public Guid Id { get; set; }

        [Column("CreatedBy")]
        public string CreatedByEmail { get; set; }
        public DateTime CreatedOn { get; set; }

        [ForeignKey("CreatedByEmail")]
        public virtual StoreStaff CreatedBy { get; set; }
        public virtual ICollection<RetrievalItem> RetrievalItems { get; set; }
    }
}