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
            System.Console.WriteLine("Start Creating Model");
            _dbContext.Database.EnsureCreated();
            System.Console.WriteLine("Finish Creating Model");
            SeedCollectionPoint();
            SeedDepartment();
            SeedDeptStaff();
            SeedSupplier();
            SeedCategory();
            SeedItem();
            System.Console.WriteLine("Finish Seeding");
        }

        private void SeedDeptStaff()
        {
            ICollection<Department> departments = _dbContext.Departments.ToList();
            ICollection<DeptStaff> deptStaffs = new List<DeptStaff>
            {
                new DeptStaff { Name = "Martini", Email = "zhao435021640@gmail.com", Department = departments.Where(d => d.Name == "Computer Science").FirstOrDefault(), Password = "123456", Role = "EMPLOYEE" },
                new DeptStaff { Name = "Meka", Email = "meka@gmail.com", Department = departments.Where(d => d.Name == "Computer Science").FirstOrDefault(), Password = "123456", Role = "DEPTHEAD" }
            };
            foreach (var deptStaff in deptStaffs)
            {
                _dbContext.Add(deptStaff);
            }
            _dbContext.SaveChanges();
        }

        private void SeedItem()
        {
            ICollection<Category> catergories = _dbContext.Categories.ToList();
            ICollection<Item> items = new List<Item>
            {
                new Item { Id = Guid.NewGuid(), Bin = "1", Description = "Item 1", UoM = "Box", Category = catergories.Where(c =>c.Name == "Category 1").FirstOrDefault()},
                new Item { Id = Guid.NewGuid(), Bin = "2", Description = "Item 2", UoM = "Dozen", Category = catergories.Where(c =>c.Name == "Category 2").FirstOrDefault()},
                new Item { Id = Guid.NewGuid(), Bin = "3", Description = "Item 3", UoM = "Each", Category = catergories.Where(c =>c.Name == "Category 3").FirstOrDefault()},
                new Item { Id = Guid.NewGuid(), Bin = "4", Description = "Item 4", UoM = "Packet", Category = catergories.Where(c =>c.Name == "Category 4").FirstOrDefault()}
            };
            foreach (var item in items)
            {
                _dbContext.Add(item);
            }
            _dbContext.SaveChanges();
        }

        private void SeedCategory()
        {
            ICollection<Category> categories = new List<Category>
            {
                new Category{Name="Category 1"},
                new Category{Name="Category 2"},
                new Category{Name="Category 3"},
            };
            foreach (var category in categories)
            {
                _dbContext.Add(category);
            }
            _dbContext.SaveChanges();
        }

        private void SeedSupplier()
        {
            ICollection<Supplier> suppliers = new List<Supplier>
            {
                new Supplier { Id = Guid.NewGuid(), Name = "Supplier One", ContactName = "", Phone = "", Fax = "", GST = "", Address = "" },
                new Supplier { Id = Guid.NewGuid(), Name = "Supplier Two", ContactName = "", Phone = "", Fax = "", GST = "", Address = "" },
                new Supplier { Id = Guid.NewGuid(), Name = "Supplier Three", ContactName = "", Phone = "", Fax = "", GST = "", Address = "" }
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