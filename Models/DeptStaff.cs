using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
namespace SSIS.Models
{
    public class DeptStaff : User
    {
        public DeptStaff() { }

        public DeptStaff(string name, string email, string password, string role)
        {
            Name = name;
            Email = email;
            Password = password;
            Role = role;
        }

        public virtual Department Department { get; set; }

        [Column("ReportTo")]
        public string ReportToId { get; set; }

        [ForeignKey("ReportToId")]
        public virtual DeptStaff ReportTo { get; set; }
    }
}