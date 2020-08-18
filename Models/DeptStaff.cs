using System.Collections.Generic;
using Newtonsoft.Json;

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
        public string DepartmentName { get; set; }

        [JsonIgnore]
        public virtual Department Department { get; set; }

        [JsonIgnore]
        public virtual ICollection<Requisition> RequestedRequisitions { get; set; }

        [JsonIgnore]
        public virtual ICollection<Requisition> ReviewedRequisitions { get; set; }

        [JsonIgnore]
        public virtual ICollection<Requisition> AcknowledgedRequisitions { get; set; }

        [JsonIgnore]
        public virtual ICollection<Delegation> DelegatedToDelegations { get; set; }

        [JsonIgnore]
        public virtual ICollection<Delegation> DelegatedByDelegations { get; set; }
    }
}