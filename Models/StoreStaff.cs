using System.Collections.Generic;
using Newtonsoft.Json;

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

        [JsonIgnore]
        public virtual ICollection<Retrieval> Retrievals { get; set; }

        [JsonIgnore]
        public virtual ICollection<Adjustment> SubmittedAdjustments { get; set; }

        [JsonIgnore]
        public virtual ICollection<Adjustment> IssuedAdjustments { get; set; }

        [JsonIgnore]
        public virtual ICollection<Order> OrderedOrders { get; set; }

        [JsonIgnore]
        public virtual ICollection<Order> ReceivedOrders { get; set; }

    }
}