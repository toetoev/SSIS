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
            //SeedCollectionPoint();
            //SeedDepartment();
            //SeedDeptStaff();
            //SeedSupplier();
            //SeedItem();
            //  SeedRequistion();
        }

        private void SeedDeptStaff()
        {
            ICollection<Department> departments = _dbContext.Departments.ToList();
            ICollection<DeptStaff> deptStaffs = new List<DeptStaff>
            {
                new DeptStaff { Name = "Martini", Email = "zhao435021640@gmail.com", Department = departments.Where(d => d.Name == "Computer Science").FirstOrDefault(), Password = "123456", Role = "EMPLOYEE" },
                new DeptStaff { Name = "Metro Boomin", Email = "metroboomin@gmail.com", Department = departments.Where(d => d.Name == "Computer Science").FirstOrDefault(), Password = "123456", Role = "EMPLOYEE" }
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
                new Item { Id = Guid.NewGuid(), Bin = "1", Description = "Item 1", UoM = "Box" }
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

        private void SeedDepartment()
        {
            //string[] departments = {
            //    "Computer Science",
            //    "Medical",
            //    "Math",
            //    "Law"
            //};
            //Array.ForEach(departments, el => _dbContext.Add(new Department { Name = el, CollectionPointId = "Science School (9:30am)" }));
            //_dbContext.SaveChanges();

            ICollection<CollectionPoint> collections = _dbContext.CollectionPoints.ToList();
            ICollection<Department> depts = new List<Department>
            {
                new Department { Name = "Computer Science",  CollectionPoint = collections.Where(d => d.Location == "Science School (9:30am)").FirstOrDefault()},
                new Department { Name = "Medical",  CollectionPoint = collections.Where(d => d.Location == "Medical School (9:30am) ").FirstOrDefault()},
                new Department { Name = "IT",  CollectionPoint = collections.Where(d => d.Location == "Engineering School (11:00am)").FirstOrDefault()},
                new Department { Name = "Medical",  CollectionPoint = collections.Where(d => d.Location == "Medical School (9:30am) ").FirstOrDefault()},
                new Department { Name = "Law",  CollectionPoint = collections.Where(d => d.Location == "University Hospital (11:00am)").FirstOrDefault()},
                new Department { Name = "Business",  CollectionPoint = collections.Where(d => d.Location == "Management School (11:00am)").FirstOrDefault()},

            };
            foreach (var dept in depts)
            {
                _dbContext.Add(dept);
            }
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
        //private void SeedRequistion()
        //{
        //    //RequisitionItem reqItem = new RequisitionItem() { Actual = 1 };
        //    //RequisitionItem reqItem2 = new RequisitionItem() { Actual = 2 };
        //    _dbContext.Add(
        //        new Requisition { 
        //            RequisitionItems = new List<RequisitionItem>() 
        //                                {   new RequisitionItem() { Actual = 1 ,Item = new Item(){s},
        //                                    new RequisitionItem() { Actual = 2 ,Item = null}
        //                                 }

        //        });
        //    _dbContext.SaveChanges();
        //}
    }
}