using System;
using System.Collections.Generic;
using System.Linq;
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
            SeedDeptStaff();
            SeedSupplier();
            SeedItem();
        }

        private void SeedDeptStaff()
        {
            ICollection<Department> departments = _dbContext.Departments.ToList();
            ICollection<DeptStaff> deptStaffs = new List<DeptStaff>
            {
                new DeptStaff { Name = "Martini", Email = "zhao435021640@gmail.com", Department = departments.Where(d => d.Name == "Computer Science").FirstOrDefault(), Password = "123456", Role = "EMPLOYEE" }
            };
            foreach (var deptStaff in deptStaffs)
            {
                _dbContext.Add(deptStaff);
            }
            _dbContext.SaveChanges();
        }


        private void SeedItem()
        {
            ICollection<Supplier> suppliers = _dbContext.Suppliers.ToList();
            ICollection<Item> items = new List<Item>
            {
                new Item { Id = "1", Bin = "1", Description = "Item 1", UOM = "Box", Supplier1 = suppliers.Where(s => s.Name == "Supplier One").FirstOrDefault(), Supplier2  = suppliers.Where(s => s.Name == "Supplier Two").FirstOrDefault(), Supplier3 = suppliers.Where(s => s.Name == "Supplier Three").FirstOrDefault()}
            };
            foreach (var item in items)
            {
                _dbContext.Add(item);
            }
            _dbContext.SaveChanges();
        }

        private void SeedSupplier()
        {
            ICollection<Supplier> suppliers = new List<Supplier>
            {
                new Supplier { Id = "s1", Name = "Supplier One", ContactName = "", Phone="", Fax="", GST="", Address=""},
                new Supplier { Id = "s2", Name = "Supplier Two", ContactName = "", Phone="", Fax="", GST="", Address=""},
                new Supplier { Id = "s3", Name = "Supplier Three", ContactName = "", Phone="", Fax="", GST="", Address=""}
            };
            foreach (var supplier in suppliers)
            {
                _dbContext.Add(supplier);
            }
            _dbContext.SaveChanges();
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