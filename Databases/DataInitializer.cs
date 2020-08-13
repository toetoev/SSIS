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
                new DeptStaff { Name = "Martini", Email = "zhao435021640@gmail.com", Department = departments.Where(d => d.Name == "Computer Science").FirstOrDefault(), Password = "1", Role = "EMPLOYEE" },
                new DeptStaff { Name = "Meka", Email = "meka@gmail.com", Department = departments.Where(d => d.Name == "Computer Science").FirstOrDefault(), Password = "1", Role = "DEPTHEAD" }
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
            ICollection<Category> categories = _dbContext.Categories.ToList();
            ICollection<Item> items = new List<Item>
            {
                new Item
                {
                Id = Guid.NewGuid(), Bin = "A1", Description = "Clips Double 1", UoM = "Dozen",
                ReorderLevel = 50, ReorderQty = 30, Category = categories.Where(c => c.Name == "Clip").FirstOrDefault()
                },
                new Item
                {
                Id = Guid.NewGuid(), Bin = "A1", Description = "Clips Double 2", UoM = "Dozen",
                ReorderLevel = 50, ReorderQty = 30, Category = categories.Where(c => c.Name == "Clip").FirstOrDefault()
                }
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

        private void SeedCategory()
        {
            string[] categories = {
                "Clip",
                "Envelope",
                "Eraser",
                "Exercise",
                "File",
                "Pen",
                "Puncher",
                "Pad",
                "Paper",
                "Ruler",
                "Scissors",
                "Tape",
                "Sharpener",
                "Shorthand",
                "Stapler",
                "Tacks",
                "Tparency",
                "Tray"
            };

            Array.ForEach(categories, el => _dbContext.Add(new Category { Name = el }));
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