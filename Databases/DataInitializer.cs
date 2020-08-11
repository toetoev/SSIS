using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using SSIS.Models;

namespace SSIS.Databases
{
    public class DataInitializer
    {
        private readonly DataContext _dbContext;

        public DataInitializer(DataContext dbContext)
        {
            _dbContext = dbContext;
        }

        public void Seed()
        {
            _dbContext.Database.EnsureDeleted();
            _dbContext.Database.EnsureCreated();
            SeedCollectionPoint();
            SeedDepartment();
            // ICollection<DeptStaff> deptStaffs = new List<DeptStaff>{
            //     new DeptStaff {Name="Martini",Email="zhao435021640@gmail.com", Password="123456",Role="EMPLOYEE" }
            // };

            // foreach (var deptStaff in deptStaffs)
            // {
            // modelBuilder.Entity<DeptStaff>(ds =>
            // {
            //     ds.HasData(new { Name = "Martini", Email = "zhao435021640@gmail.com", Password = "123456", Role = "EMPLOYEE" });
            //     ds.OwnsOne(d => d.Department).HasData(new { Email = "zhao435021640@gmail.com", Name = "Computer Science" });
            // });
            // }
        }

        private void SeedDepartment()
        {
            string[] departments = {
                "Computer Science",
                "Medical",
                "Math",
                "Law"
            };
            Array.ForEach(departments, el => _dbContext.Add(new Department { Name = el, CollectionPointId = null }));
            _dbContext.SaveChanges();
        }

        private void SeedCollectionPoint()
        {
            string[] collectionPointLocations = {
                "Stationery Store - Administration Building (9:30am)",
                "Management School (11:00am)",
                "Medical School (9:30am) ",
                "Engineering School (11:00am)",
                "Science School (9:30am)",
                "University Hospital (11:00am)"
            };
            Array.ForEach(collectionPointLocations, el => _dbContext.Add(new CollectionPoint { Location = el }));
            _dbContext.SaveChanges();
        }
    }
}