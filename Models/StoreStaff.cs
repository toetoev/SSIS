using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace SSIS.Models
{
    public class StoreStaff : User
    {

        public StoreStaff() { }

        public StoreStaff(string name, string email, string password, string role)
        {
            base.Name = name;
            base.Email = email;
            base.Password = password;
            base.Role = role;
        }
        public virtual ICollection<Retrieval> Retrievals { get; set; }
        public virtual ICollection<Adjustment> SubmittedAdjustments { get; set; }
        public virtual ICollection<Adjustment> IssuedAdjustments { get; set; }
        public virtual ICollection<Order> OrderedOrders { get; set; }
        public virtual ICollection<Order> ReceivedOrders { get; set; }

    }
}