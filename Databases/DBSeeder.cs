using SSIS.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SSIS.Databases
{
    public class DBSeeder
    {
        public DBSeeder(DataContext dataContext)
        {
            DeptStaff ds1 = new DeptStaff();
            ds1.Email = "metroboomin@gmail.com";
            ds1.Name = "Metro Boomin";
            ds1.Password = "123456";
            ds1.Role = DeptRole.DeptRep;
            dataContext.Add(ds1);

            DeptStaff ds2 = new DeptStaff();
            ds2.Email = "future@gmail.com";
            ds2.Name = "Future";
            ds2.Password = "111111";
            ds2.Role = DeptRole.Employee;
            dataContext.Add(ds2);

            dataContext.SaveChanges();
        }
    }
}
