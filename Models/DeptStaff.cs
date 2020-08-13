using System;
using System.Collections.Generic;
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

        public virtual ICollection<Requisition> RequestedRequisitions { get; set; }
        public virtual ICollection<Requisition> ReviewedRequisitions { get; set; }
        public virtual ICollection<Requisition> AcknowledgedRequisitions { get; set; }
        public virtual ICollection<Delegation> DelegatedToDelegations { get; set; }
        public virtual ICollection<Delegation> DelegatedByDelegations { get; set; }
    }
}