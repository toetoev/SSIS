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
            SeedStoreStaff();
            SeedSupplier();
            SeedCategory();
            SeedItem();
            SeedSupplierTenderItem();
        }

        private void SeedSupplierTenderItem()
        {
            List<Item> items = _dbContext.Items.ToList();
            foreach (var item in items)
            {
                SupplierTenderItem supplierTenderItem1 = new SupplierTenderItem(10, 1, item.Id, GetSupplierByName("Supplier 1").Id);
                SupplierTenderItem supplierTenderItem2 = new SupplierTenderItem(10, 2, item.Id, GetSupplierByName("Supplier 2").Id);
                SupplierTenderItem supplierTenderItem3 = new SupplierTenderItem(10, 3, item.Id, GetSupplierByName("Supplier 3").Id);
                _dbContext.Add(supplierTenderItem1);
                _dbContext.SaveChanges();
                _dbContext.Add(supplierTenderItem2);
                _dbContext.SaveChanges();
                _dbContext.Add(supplierTenderItem3);
                _dbContext.SaveChanges();
            }
        }

        private void SeedDeptStaff()
        {
            ICollection<Department> departments = _dbContext.Departments.ToList();
            ICollection<DeptStaff> deptStaffs = new List<DeptStaff>
            {
                new DeptStaff { Name = "CSE1", Email = "zhao435021640@gmail.com", Department = departments.Where(d => d.Name == "Computer Science").FirstOrDefault(), Password = "1", Role = "EMPLOYEE" },
                new DeptStaff { Name = "CSE2", Email = "e0533360@u.nus.edu", Department = departments.Where(d => d.Name == "Computer Science").FirstOrDefault(), Password = "1", Role = "EMPLOYEE" },
                new DeptStaff { Name = "CSDH", Email = "pranammeka@gmail.com", Department = departments.Where(d => d.Name == "Computer Science").FirstOrDefault(), Password = "1", Role = "DEPTHEAD" },
                new DeptStaff { Name = "CSDR", Email = "taihuei0114@gmail.com", Department = departments.Where(d => d.Name == "Computer Science").FirstOrDefault(), Password = "1", Role = "DEPTREP" },
                new DeptStaff { Name = "LE1", Email = "martini.reinherz@gmail.com", Department = departments.Where(d => d.Name == "Law").FirstOrDefault(), Password = "1", Role = "EMPLOYEE" },
                new DeptStaff { Name = "LDH", Email = "pranammek1@gmail.com", Department = departments.Where(d => d.Name == "Law").FirstOrDefault(), Password = "1", Role = "DEPTHEAD" },
                new DeptStaff { Name = "LDR", Email = "taihuei0111@gmail.com", Department = departments.Where(d => d.Name == "Law").FirstOrDefault(), Password = "1", Role = "DEPTREP" },
            };
            foreach (var deptStaff in deptStaffs)
            {
                _dbContext.Add(deptStaff);
            }
            _dbContext.SaveChanges();
        }

        private void SeedStoreStaff()
        {
            ICollection<StoreStaff> storeStaffs = new List<StoreStaff>
            {
                new StoreStaff { Name = "SC1", Email = "hkw1996@gmail.com", Password = "1", Role = "CLERK" },
                new StoreStaff { Name = "SS1", Email = "christophercolinfong@gmail.com", Password = "1", Role = "SUPERVISOR" },
                new StoreStaff { Name = "SM1", Email = "yuzanayushwe@gmail.com", Password = "1", Role = "MANAGER" }
            };
            foreach (var storeStaff in storeStaffs)
            {
                _dbContext.Add(storeStaff);
            }
            _dbContext.SaveChanges();
        }

        private void SeedItem()
        {
            ICollection<Item> items = new List<Item>
            {
                new Item("C1", "Clips Double 1\''", "Dozen", 50, 30, 10, GetCategoryByName("Clip")),
                new Item("C2", "Clips Double 2\''", "Dozen", 50, 30, 90, GetCategoryByName("Clip")),
                new Item("C3", "Clips Double 3/4\''", "Dozen", 50, 30, 90, GetCategoryByName("Clip")),
                new Item("C4", "Clips Paper Large", "Box", 50, 30, 100, GetCategoryByName("Clip")),
                new Item("C5", "Clips Paper Medium ", "Box", 50, 30, 100, GetCategoryByName("Clip")),
                new Item("C6", "Clips Paper Small", "Box", 50, 30, 100, GetCategoryByName("Clip")),
                new Item("E1", "Envelope Brown (3\"x6\")", "Each", 600, 400, 100, GetCategoryByName("Envelope")),
                new Item("E2", "Envelope Brown (3\"x6\") w/ Window", "Each", 600, 400, 100, GetCategoryByName("Envelope")),
                new Item("E3", "Envelope Brown (5\"x7\")", "Each", 600, 400, 100, GetCategoryByName("Envelope")),
                new Item("E4", "Envelope Brown (5\"x7\") w/ Window", "Each", 600, 400, 100, GetCategoryByName("Envelope")),
                new Item("E5", "Envelope White (3\"x6\")", "Each", 600, 400, 100, GetCategoryByName("Envelope")),
                new Item("E6", "Envelope White (3\"x6\") w/ Window", "Each", 600, 400, 100, GetCategoryByName("Envelope")),
                new Item("E7", "Envelope White (5\"x7\")", "Each", 600, 400, 100, GetCategoryByName("Envelope")),
                new Item("E8", "Envelope White (5\"x7\") w/ Window", "Each", 600, 400, 100, GetCategoryByName("Envelope")),
                new Item("E20", "Eraser (hard)", "Each", 50, 20, 100, GetCategoryByName("Eraser")),
                new Item("E21", "Eraser (soft)", "Each", 50, 20, 100, GetCategoryByName("Eraser")),
                new Item("E30", "Exercise Book (100 pg)", "Each", 100, 50, 100, GetCategoryByName("Exercise")),
                new Item("E31", "Exercise Book (120 pg)", "Each", 100, 50, 100, GetCategoryByName("Exercise")),
                new Item("E32", "Exercise Book A4 Hardcover (100 pg)", "Each", 100, 50, 100, GetCategoryByName("Exercise")),
                new Item("E33", "Exercise Book A4 Hardcover (120 pg)", "Each", 100, 50, 100, GetCategoryByName("Exercise")),
                new Item("E34", "Exercise Book A4 Hardcover (200 pg)", "Each", 100, 50, 100, GetCategoryByName("Exercise")),
                new Item("E35", "Exercise Book Hardcover (100 pg)", "Each", 100, 50, 100, GetCategoryByName("Exercise")),
                new Item("E36", "Exercise Book Hardcover (120 pg)", "Each", 100, 50, 100, GetCategoryByName("Exercise")),
                new Item("F20", "File Separator", "Set", 100, 50, 100, GetCategoryByName("File")),
                new Item("F21", "File-Blue Plain", "Each", 200, 100, 100, GetCategoryByName("File")),
                new Item("F22", "File-Blue with Logo", "Each", 200, 100, 100, GetCategoryByName("File")),
                new Item("F23", "File-Brown w/o Logo", "Each", 200, 150, 100, GetCategoryByName("File")),
                new Item("F24", "File-Brown with Logo", "Each", 200, 150, 100, GetCategoryByName("File")),
                new Item("F31", "Folder Plastic Blue", "Each", 200, 150, 100, GetCategoryByName("File")),
                new Item("F32", "Folder Plastic Clear", "Each", 200, 150, 100, GetCategoryByName("File")),
                new Item("F33", "Folder Plastic Green", "Each", 200, 150, 100, GetCategoryByName("File")),
                new Item("F34", "Folder Plastic Pink", "Each", 200, 150, 100, GetCategoryByName("File")),
                new Item("F35", "Folder Plastic Yellow", "Each", 200, 150, 100, GetCategoryByName("File")),
                new Item("H11", "Highlighter Blue", "Box", 100, 80, 100, GetCategoryByName("Pen")),
                new Item("H12", "Highlighter Green", "Box", 100, 80, 100, GetCategoryByName("Pen")),
                new Item("H13", "Highlighter Pink", "Box", 100, 80, 100, GetCategoryByName("Pen")),
                new Item("H14", "Highlighter Yellow", "Box", 100, 80, 100, GetCategoryByName("Pen")),
                new Item("H31", "Hole Puncher 2 holes", "Each", 50, 20, 100, GetCategoryByName("Puncher")),
                new Item("H32", "Hole Puncher 3 holes", "Each", 50, 20, 100, GetCategoryByName("Puncher")),
                new Item("H33", "Hole Puncher Adjustable", "Each", 50, 20, 100, GetCategoryByName("Puncher")),
                new Item("P10", "Pad Postit Memo 1\"x2\"", "Packet", 100, 60, 100, GetCategoryByName("Pad")),
                new Item("P11", "Pad Postit Memo 1/2\"x1\"", "Packet", 100, 60, 100, GetCategoryByName("Pad")),
                new Item("P12", "Pad Postit Memo 1/2\"x2\"", "Packet", 100, 60, 100, GetCategoryByName("Pad")),
                new Item("P13", "Pad Postit Memo 2\"x3\"", "Packet", 100, 60, 100, GetCategoryByName("Pad")),
                new Item("P14", "Pad Postit Memo 2\"x4\"", "Packet", 100, 60, 100, GetCategoryByName("Pad")),
                new Item("P15", "Pad Postit Memo 2\"x4\"", "Packet", 100, 60, 100, GetCategoryByName("Pad")),
                new Item("P16", "Pad Postit Memo 3/4\"x2\"", "Packet", 100, 60, 100, GetCategoryByName("Pad")),
                new Item("P20", "Paper Photostat A3", "Box", 500, 500, 100, GetCategoryByName("Paper")),
                new Item("P21", "Paper Photostat A4", "Box", 500, 500, 100, GetCategoryByName("Paper")),
                new Item("P30", "Pen Ballpoint Black", "Dozen", 100, 50, 100, GetCategoryByName("Pen")),
                new Item("P31", "Pen Ballpoint Blue", "Dozen", 100, 50, 100, GetCategoryByName("Pen")),
                new Item("P32", "Pen Ballpoint Red", "Dozen", 100, 50, 100, GetCategoryByName("Pen")),
                new Item("P33", "Pen Felt Tip Black", "Dozen", 100, 50, 100, GetCategoryByName("Pen")),
                new Item("P34", "Pen Felt Tip Blue", "Dozen", 100, 50, 100, GetCategoryByName("Pen")),
                new Item("P35", "Pen Felt Tip Red", "Dozen", 100, 50, 100, GetCategoryByName("Pen")),
                new Item("P36", "Pen Transparency Permanent", "Packet", 100, 50, 100, GetCategoryByName("Pen")),
                new Item("P37", "Pen Transparency Soluble", "Packet", 100, 50, 100, GetCategoryByName("Pen")),
                new Item("P38", "Pen Whiteboard Marker Black", "Box", 100, 50, 100, GetCategoryByName("Pen")),
                new Item("P39", "Pen Whiteboard Marker Blue", "Box", 100, 50, 100, GetCategoryByName("Pen")),
                new Item("P40", "Pen Whiteboard Marker Green", "Box", 100, 50, 100, GetCategoryByName("Pen")),
                new Item("P41", "Pen Whiteboard Marker Red", "Box", 100, 50, 100, GetCategoryByName("Pen")),
                new Item("P42", "Pencil 2B", "Dozen", 100, 50, 100, GetCategoryByName("Pen")),
                new Item("P43", "Pencil 2B with Eraser End", "Dozen", 100, 50, 100, GetCategoryByName("Pen")),
                new Item("P44", "Pencil 4H ", "Dozen", 100, 50, 100, GetCategoryByName("Pen")),
                new Item("P45", "Pencil B", "Dozen", 100, 50, 100, GetCategoryByName("Pen")),
                new Item("P46", "Pencil B with Eraser End", "Dozen", 100, 50, 100, GetCategoryByName("Pen")),
                new Item("R2", "Ruler 12\''", "Dozen", 50, 20, 100, GetCategoryByName("Ruler")),
                new Item("R1", "Ruler 6\''", "Dozen", 50, 20, 100, GetCategoryByName("Ruler")),
                new Item("S100", "Scissors", "Each", 50, 20, 100, GetCategoryByName("Scissors")),
                new Item("S40", "Scotch Tape", "Each", 50, 20, 100, GetCategoryByName("Tape")),
                new Item("S41", "Scotch Tape Dispenser", "Each", 50, 20, 100, GetCategoryByName("Tape")),
                new Item("S101", "Sharpener", "Each", 50, 20, 100, GetCategoryByName("Sharpener")),
                new Item("S10", "Shorthand Book (100 pg)", "Each", 100, 80, 100, GetCategoryByName("Shorthand")),
                new Item("S11", "Shorthand Book (120 pg)", "Each", 100, 80, 100, GetCategoryByName("Shorthand")),
                new Item("S12", "Shorthand Book (80 pg)", "Each", 100, 80, 100, GetCategoryByName("Shorthand")),
                new Item("S20", "Stapler No. 28", "Each", 50, 20, 100, GetCategoryByName("Stapler")),
                new Item("S21", "Stapler No. 36", "Each", 50, 20, 100, GetCategoryByName("Stapler")),
                new Item("S22", "Stapler No. 28", "Box", 50, 20, 100, GetCategoryByName("Stapler")),
                new Item("S23", "Stapler No. 36", "Box", 50, 20, 100, GetCategoryByName("Stapler")),
                new Item("T1", "Thumb Tacks Large", "Box", 10, 10, 100, GetCategoryByName("Tacks")),
                new Item("T2", "Thumb Tacks Medium", "Box", 10, 10, 100, GetCategoryByName("Tacks")),
                new Item("T3", "Thumb Tacks Small", "Box", 10, 10, 100, GetCategoryByName("Tacks")),
                new Item("T20", "Transparency Blue", "Box", 100, 200, 100, GetCategoryByName("Tparency")),
                new Item("T21", "Transparency Clear", "Box", 500, 400, 100, GetCategoryByName("Tparency")),
                new Item("T22", "Transparency Green", "Box", 100, 200, 100, GetCategoryByName("Tparency")),
                new Item("T23", "Transparency Red", "Box", 100, 200, 100, GetCategoryByName("Tparency")),
                new Item("T24", "Transparency Reverse Blue", "Box", 100, 200, 100, GetCategoryByName("Tparency")),
                new Item("T25", "Transparency Cover 3M", "Box", 500, 400, 100, GetCategoryByName("Tparency")),
                new Item("T100", "Trays In/Out", "Set", 20, 10, 100, GetCategoryByName("Tray")),
            };
            foreach (var item in items)
            {
                _dbContext.Add(item);
            }
            _dbContext.SaveChanges();
        }

        private Category GetCategoryByName(string category)
        {
            return _dbContext.Categories.Where(c => c.Name == category).Single();
        }

        private void SeedSupplier()
        {
            ICollection<Supplier> suppliers = new List<Supplier>
            {
                new Supplier { Id = Guid.NewGuid(), Name = "Supplier 1", ContactName = "Supplier 1 Contact", Phone = "45723494", Fax = "", GST = "", Address = "" },
                new Supplier { Id = Guid.NewGuid(), Name = "Supplier 2", ContactName = "Supplier 2 Contact", Phone = "94367954", Fax = "", GST = "", Address = "" },
                new Supplier { Id = Guid.NewGuid(), Name = "Supplier 3", ContactName = "Supplier 3 Contact", Phone = "13096528", Fax = "", GST = "", Address = "" }
            };
            foreach (var supplier in suppliers)
            {
                _dbContext.Add(supplier);
            }
            _dbContext.SaveChanges();
        }
        private Supplier GetSupplierByName(string name)
        {
            return _dbContext.Suppliers.Where(s => s.Name == name).Single();
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
                "Stationery Store - Administration Building (9:00 AM)",
                "Management School (11:00 AM)",
                "Medical School (9:30 AM) ",
                "Engineering School (11:00 AM)",
                "Science School (9:30 AM)",
                "University Hospital (11:00 AM)"
            };
            Array.ForEach(collectionPointLocations, el => _dbContext.Add(new CollectionPoint { Location = el }));
            _dbContext.SaveChanges();
        }
    }
}