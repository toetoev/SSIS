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
                new Item {Id = Guid.NewGuid(), Bin = "C1",Description ="Clips Double 1\"",UoM="Dozen",ReorderLevel=50,ReorderQty=30, Category = categories.Where(c => c.Name == "Clip").FirstOrDefault()},
                new Item {Id = Guid.NewGuid(), Bin = "C2",Description ="Clips Double 2\"",UoM="Dozen",ReorderLevel=50,ReorderQty=30, Category = categories.Where(c => c.Name == "Clip").FirstOrDefault()},
                new Item {Id = Guid.NewGuid(), Bin = "C3",Description ="Clips Double 3/4\"",UoM="Dozen",ReorderLevel=50,ReorderQty=30, Category = categories.Where(c => c.Name == "Clip").FirstOrDefault()},
                new Item {Id = Guid.NewGuid(), Bin = "C4",Description ="Clips Paper Large",UoM="Box",ReorderLevel=50,ReorderQty=30, Category = categories.Where(c => c.Name == "Clip").FirstOrDefault()},
                new Item {Id = Guid.NewGuid(), Bin = "C5",Description ="Clips Paper Medium ",UoM="Box",ReorderLevel=50,ReorderQty=30, Category = categories.Where(c => c.Name == "Clip").FirstOrDefault()},
                new Item {Id = Guid.NewGuid(), Bin = "C6",Description ="Clips Paper Small",UoM="Box",ReorderLevel=50,ReorderQty=30, Category = categories.Where(c => c.Name == "Clip").FirstOrDefault()},
                new Item {Id = Guid.NewGuid(), Bin = "E1",Description ="Envelope Brown (3\"x6\")",UoM="Each",ReorderLevel=600,ReorderQty=400, Category = categories.Where(c => c.Name == "Envelope").FirstOrDefault()},
                new Item {Id = Guid.NewGuid(), Bin = "E2",Description ="Envelope Brown (3\"x6\") w/ Window",UoM="Each",ReorderLevel=600,ReorderQty=400, Category = categories.Where(c => c.Name == "Envelope").FirstOrDefault()},
                new Item {Id = Guid.NewGuid(), Bin = "E3",Description ="Envelope Brown (5\"x7\")",UoM="Each",ReorderLevel=600,ReorderQty=400, Category = categories.Where(c => c.Name == "Envelope").FirstOrDefault()},
                new Item {Id = Guid.NewGuid(), Bin = "E4",Description ="Envelope Brown (5\"x7\") w/ Window",UoM="Each",ReorderLevel=600,ReorderQty=400, Category = categories.Where(c => c.Name == "Envelope").FirstOrDefault()},
                new Item {Id = Guid.NewGuid(), Bin = "E5",Description ="Envelope White (3\"x6\")",UoM="Each",ReorderLevel=600,ReorderQty=400, Category = categories.Where(c => c.Name == "Envelope").FirstOrDefault()},
                new Item {Id = Guid.NewGuid(), Bin = "E6",Description ="Envelope White (3\"x6\") w/ Window",UoM="Each",ReorderLevel=600,ReorderQty=400, Category = categories.Where(c => c.Name == "Envelope").FirstOrDefault()},
                new Item {Id = Guid.NewGuid(), Bin = "E7",Description ="Envelope White (5\"x7\")",UoM="Each",ReorderLevel=600,ReorderQty=400, Category = categories.Where(c => c.Name == "Envelope").FirstOrDefault()},
                new Item {Id = Guid.NewGuid(), Bin = "E8",Description ="Envelope White (5\"x7\") w/ Window",UoM="Each",ReorderLevel=600,ReorderQty=400, Category = categories.Where(c => c.Name == "Envelope").FirstOrDefault()},
                new Item {Id = Guid.NewGuid(), Bin = "E20",Description ="Eraser (hard)",UoM="Each",ReorderLevel=50,ReorderQty=20, Category = categories.Where(c => c.Name == "Eraser").FirstOrDefault()},
                new Item {Id = Guid.NewGuid(), Bin = "E21",Description ="Eraser (soft)",UoM="Each",ReorderLevel=50,ReorderQty=20, Category = categories.Where(c => c.Name == "Eraser").FirstOrDefault()},
                new Item {Id = Guid.NewGuid(), Bin = "E30",Description ="Exercise Book (100 pg)",UoM="Each",ReorderLevel=100,ReorderQty=50, Category = categories.Where(c => c.Name == "Exercise").FirstOrDefault()},
                new Item {Id = Guid.NewGuid(), Bin = "E31",Description ="Exercise Book (120 pg)",UoM="Each",ReorderLevel=100,ReorderQty=50, Category = categories.Where(c => c.Name == "Exercise").FirstOrDefault()},
                new Item {Id = Guid.NewGuid(), Bin = "E32",Description ="Exercise Book A4 Hardcover (100 pg)",UoM="Each",ReorderLevel=100,ReorderQty=50, Category = categories.Where(c => c.Name == "Exercise").FirstOrDefault()},
                new Item {Id = Guid.NewGuid(), Bin = "E33",Description ="Exercise Book A4 Hardcover (120 pg)",UoM="Each",ReorderLevel=100,ReorderQty=50, Category = categories.Where(c => c.Name == "Exercise").FirstOrDefault()},
                new Item {Id = Guid.NewGuid(), Bin = "E34",Description ="Exercise Book A4 Hardcover (200 pg)",UoM="Each",ReorderLevel=100,ReorderQty=50, Category = categories.Where(c => c.Name == "Exercise").FirstOrDefault()},
                new Item {Id = Guid.NewGuid(), Bin = "E35",Description ="Exercise Book Hardcover (100 pg)",UoM="Each",ReorderLevel=100,ReorderQty=50, Category = categories.Where(c => c.Name == "Exercise").FirstOrDefault()},
                new Item {Id = Guid.NewGuid(), Bin = "E36",Description ="Exercise Book Hardcover (120 pg)",UoM="Each",ReorderLevel=100,ReorderQty=50, Category = categories.Where(c => c.Name == "Exercise").FirstOrDefault()},
                new Item {Id = Guid.NewGuid(), Bin = "F20",Description ="File Separator",UoM="Set",ReorderLevel=100,ReorderQty=50, Category = categories.Where(c => c.Name == "File").FirstOrDefault()},
                new Item {Id = Guid.NewGuid(), Bin = "F21",Description ="File-Blue Plain",UoM="Each",ReorderLevel=200,ReorderQty=100, Category = categories.Where(c => c.Name == "File").FirstOrDefault()},
                new Item {Id = Guid.NewGuid(), Bin = "F22",Description ="File-Blue with Logo",UoM="Each",ReorderLevel=200,ReorderQty=100, Category = categories.Where(c => c.Name == "File").FirstOrDefault()},
                new Item {Id = Guid.NewGuid(), Bin = "F23",Description ="File-Brown w/o Logo",UoM="Each",ReorderLevel=200,ReorderQty=150, Category = categories.Where(c => c.Name == "File").FirstOrDefault()},
                new Item {Id = Guid.NewGuid(), Bin = "F24",Description ="File-Brown with Logo",UoM="Each",ReorderLevel=200,ReorderQty=150, Category = categories.Where(c => c.Name == "File").FirstOrDefault()},
                new Item {Id = Guid.NewGuid(), Bin = "F31",Description ="Folder Plastic Blue",UoM="Each",ReorderLevel=200,ReorderQty=150, Category = categories.Where(c => c.Name == "File").FirstOrDefault()},
                new Item {Id = Guid.NewGuid(), Bin = "F32",Description ="Folder Plastic Clear",UoM="Each",ReorderLevel=200,ReorderQty=150, Category = categories.Where(c => c.Name == "File").FirstOrDefault()},
                new Item {Id = Guid.NewGuid(), Bin = "F33",Description ="Folder Plastic Green",UoM="Each",ReorderLevel=200,ReorderQty=150, Category = categories.Where(c => c.Name == "File").FirstOrDefault()},
                new Item {Id = Guid.NewGuid(), Bin = "F34",Description ="Folder Plastic Pink",UoM="Each",ReorderLevel=200,ReorderQty=150, Category = categories.Where(c => c.Name == "File").FirstOrDefault()},
                new Item {Id = Guid.NewGuid(), Bin = "F35",Description ="Folder Plastic Yellow",UoM="Each",ReorderLevel=200,ReorderQty=150, Category = categories.Where(c => c.Name == "File").FirstOrDefault()},
                new Item {Id = Guid.NewGuid(), Bin = "H11",Description ="Highlighter Blue",UoM="Box",ReorderLevel=100,ReorderQty=80, Category = categories.Where(c => c.Name == "Pen").FirstOrDefault()},
                new Item {Id = Guid.NewGuid(), Bin = "H12",Description ="Highlighter Green",UoM="Box",ReorderLevel=100,ReorderQty=80, Category = categories.Where(c => c.Name == "Pen").FirstOrDefault()},
                new Item {Id = Guid.NewGuid(), Bin = "H13",Description ="Highlighter Pink",UoM="Box",ReorderLevel=100,ReorderQty=80, Category = categories.Where(c => c.Name == "Pen").FirstOrDefault()},
                new Item {Id = Guid.NewGuid(), Bin = "H14",Description ="Highlighter Yellow",UoM="Box",ReorderLevel=100,ReorderQty=80, Category = categories.Where(c => c.Name == "Pen").FirstOrDefault()},
                new Item {Id = Guid.NewGuid(), Bin = "H31",Description ="Hole Puncher 2 holes",UoM="Each",ReorderLevel=50,ReorderQty=20, Category = categories.Where(c => c.Name == "Puncher").FirstOrDefault()},
                new Item {Id = Guid.NewGuid(), Bin = "H32",Description ="Hole Puncher 3 holes",UoM="Each",ReorderLevel=50,ReorderQty=20, Category = categories.Where(c => c.Name == "Puncher").FirstOrDefault()},
                new Item {Id = Guid.NewGuid(), Bin = "H33",Description ="Hole Puncher Adjustable",UoM="Each",ReorderLevel=50,ReorderQty=20, Category = categories.Where(c => c.Name == "Puncher").FirstOrDefault()},
                new Item {Id = Guid.NewGuid(), Bin = "P10",Description ="Pad Postit Memo 1\"x2\"",UoM="Packet",ReorderLevel=100,ReorderQty=60, Category = categories.Where(c => c.Name == "Pad").FirstOrDefault()},
                new Item {Id = Guid.NewGuid(), Bin = "P11",Description ="Pad Postit Memo 1/2\"x1\"",UoM="Packet",ReorderLevel=100,ReorderQty=60, Category = categories.Where(c => c.Name == "Pad").FirstOrDefault()},
                new Item {Id = Guid.NewGuid(), Bin = "P12",Description ="Pad Postit Memo 1/2\"x2\"",UoM="Packet",ReorderLevel=100,ReorderQty=60, Category = categories.Where(c => c.Name == "Pad").FirstOrDefault()},
                new Item {Id = Guid.NewGuid(), Bin = "P13",Description ="Pad Postit Memo 2\"x3\"",UoM="Packet",ReorderLevel=100,ReorderQty=60, Category = categories.Where(c => c.Name == "Pad").FirstOrDefault()},
                new Item {Id = Guid.NewGuid(), Bin = "P14",Description ="Pad Postit Memo 2\"x4\"",UoM="Packet",ReorderLevel=100,ReorderQty=60, Category = categories.Where(c => c.Name == "Pad").FirstOrDefault()},
                new Item {Id = Guid.NewGuid(), Bin = "P15",Description ="Pad Postit Memo 2\"x4\"",UoM="Packet",ReorderLevel=100,ReorderQty=60, Category = categories.Where(c => c.Name == "Pad").FirstOrDefault()},
                new Item {Id = Guid.NewGuid(), Bin = "P16",Description ="Pad Postit Memo 3/4\"x2\"",UoM="Packet",ReorderLevel=100,ReorderQty=60, Category = categories.Where(c => c.Name == "Pad").FirstOrDefault()},
                new Item {Id = Guid.NewGuid(), Bin = "P20",Description ="Paper Photostat A3",UoM="Box",ReorderLevel=500,ReorderQty=500, Category = categories.Where(c => c.Name == "Paper").FirstOrDefault()},
                new Item {Id = Guid.NewGuid(), Bin = "P21",Description ="Paper Photostat A4",UoM="Box",ReorderLevel=500,ReorderQty=500, Category = categories.Where(c => c.Name == "Paper").FirstOrDefault()},
                new Item {Id = Guid.NewGuid(), Bin = "P30",Description ="Pen Ballpoint Black",UoM="Dozen",ReorderLevel=100,ReorderQty=50, Category = categories.Where(c => c.Name == "Pen").FirstOrDefault()},
                new Item {Id = Guid.NewGuid(), Bin = "P31",Description ="Pen Ballpoint Blue",UoM="Dozen",ReorderLevel=100,ReorderQty=50, Category = categories.Where(c => c.Name == "Pen").FirstOrDefault()},
                new Item {Id = Guid.NewGuid(), Bin = "P32",Description ="Pen Ballpoint Red",UoM="Dozen",ReorderLevel=100,ReorderQty=50, Category = categories.Where(c => c.Name == "Pen").FirstOrDefault()},
                new Item {Id = Guid.NewGuid(), Bin = "P33",Description ="Pen Felt Tip Black",UoM="Dozen",ReorderLevel=100,ReorderQty=50, Category = categories.Where(c => c.Name == "Pen").FirstOrDefault()},
                new Item {Id = Guid.NewGuid(), Bin = "P34",Description ="Pen Felt Tip Blue",UoM="Dozen",ReorderLevel=100,ReorderQty=50, Category = categories.Where(c => c.Name == "Pen").FirstOrDefault()},
                new Item {Id = Guid.NewGuid(), Bin = "P35",Description ="Pen Felt Tip Red",UoM="Dozen",ReorderLevel=100,ReorderQty=50, Category = categories.Where(c => c.Name == "Pen").FirstOrDefault()},
                new Item {Id = Guid.NewGuid(), Bin = "P36",Description ="Pen Transparency Permanent",UoM="Packet",ReorderLevel=100,ReorderQty=50, Category = categories.Where(c => c.Name == "Pen").FirstOrDefault()},
                new Item {Id = Guid.NewGuid(), Bin = "P37",Description ="Pen Transparency Soluble",UoM="Packet",ReorderLevel=100,ReorderQty=50, Category = categories.Where(c => c.Name == "Pen").FirstOrDefault()},
                new Item {Id = Guid.NewGuid(), Bin = "P38",Description ="Pen Whiteboard Marker Black",UoM="Box",ReorderLevel=100,ReorderQty=50, Category = categories.Where(c => c.Name == "Pen").FirstOrDefault()},
                new Item {Id = Guid.NewGuid(), Bin = "P39",Description ="Pen Whiteboard Marker Blue",UoM="Box",ReorderLevel=100,ReorderQty=50, Category = categories.Where(c => c.Name == "Pen").FirstOrDefault()},
                new Item {Id = Guid.NewGuid(), Bin = "P40",Description ="Pen Whiteboard Marker Green",UoM="Box",ReorderLevel=100,ReorderQty=50, Category = categories.Where(c => c.Name == "Pen").FirstOrDefault()},
                new Item {Id = Guid.NewGuid(), Bin = "P41",Description ="Pen Whiteboard Marker Red",UoM="Box",ReorderLevel=100,ReorderQty=50, Category = categories.Where(c => c.Name == "Pen").FirstOrDefault()},
                new Item {Id = Guid.NewGuid(), Bin = "P42",Description ="Pencil 2B",UoM="Dozen",ReorderLevel=100,ReorderQty=50, Category = categories.Where(c => c.Name == "Pen").FirstOrDefault()},
                new Item {Id = Guid.NewGuid(), Bin = "P43",Description ="Pencil 2B with Eraser End",UoM="Dozen",ReorderLevel=100,ReorderQty=50, Category = categories.Where(c => c.Name == "Pen").FirstOrDefault()},
                new Item {Id = Guid.NewGuid(), Bin = "P44",Description ="Pencil 4H ",UoM="Dozen",ReorderLevel=100,ReorderQty=50, Category = categories.Where(c => c.Name == "Pen").FirstOrDefault()},
                new Item {Id = Guid.NewGuid(), Bin = "P45",Description ="Pencil B",UoM="Dozen",ReorderLevel=100,ReorderQty=50, Category = categories.Where(c => c.Name == "Pen").FirstOrDefault()},
                new Item {Id = Guid.NewGuid(), Bin = "P46",Description ="Pencil B with Eraser End",UoM="Dozen",ReorderLevel=100,ReorderQty=50, Category = categories.Where(c => c.Name == "Pen").FirstOrDefault()},
                new Item {Id = Guid.NewGuid(), Bin = "R2",Description ="Ruler 12\"",UoM="Dozen",ReorderLevel=50,ReorderQty=20, Category = categories.Where(c => c.Name == "Ruler").FirstOrDefault()},
                new Item {Id = Guid.NewGuid(), Bin = "R1",Description ="Ruler 6\"",UoM="Dozen",ReorderLevel=50,ReorderQty=20, Category = categories.Where(c => c.Name == "Ruler").FirstOrDefault()},
                new Item {Id = Guid.NewGuid(), Bin = "S100",Description ="Scissors",UoM="Each",ReorderLevel=50,ReorderQty=20, Category = categories.Where(c => c.Name == "Scissors").FirstOrDefault()},
                new Item {Id = Guid.NewGuid(), Bin = "S40",Description ="Scotch Tape",UoM="Each",ReorderLevel=50,ReorderQty=20, Category = categories.Where(c => c.Name == "Tape").FirstOrDefault()},
                new Item {Id = Guid.NewGuid(), Bin = "S41",Description ="Scotch Tape Dispenser",UoM="Each",ReorderLevel=50,ReorderQty=20, Category = categories.Where(c => c.Name == "Tape").FirstOrDefault()},
                new Item {Id = Guid.NewGuid(), Bin = "S101",Description ="Sharpener",UoM="Each",ReorderLevel=50,ReorderQty=20, Category = categories.Where(c => c.Name == "Sharpener").FirstOrDefault()},
                new Item {Id = Guid.NewGuid(), Bin = "S101",Description ="Sharpener",UoM="Each",ReorderLevel=50,ReorderQty=20, Category = categories.Where(c => c.Name == "Sharpener").FirstOrDefault()},
                new Item {Id = Guid.NewGuid(), Bin = "S101",Description ="Sharpener",UoM="Each",ReorderLevel=50,ReorderQty=20, Category = categories.Where(c => c.Name == "Sharpener").FirstOrDefault()},
                new Item {Id = Guid.NewGuid(), Bin = "S101",Description ="Sharpener",UoM="Each",ReorderLevel=50,ReorderQty=20, Category = categories.Where(c => c.Name == "Sharpener").FirstOrDefault()},
                new Item {Id = Guid.NewGuid(), Bin = "S10",Description ="Shorthand Book (100 pg)",UoM="Each",ReorderLevel=100,ReorderQty=80, Category = categories.Where(c => c.Name == "Shorthand").FirstOrDefault()},
                new Item {Id = Guid.NewGuid(), Bin = "S11",Description ="Shorthand Book (120 pg)",UoM="Each",ReorderLevel=100,ReorderQty=80, Category = categories.Where(c => c.Name == "Shorthand").FirstOrDefault()},
                new Item {Id = Guid.NewGuid(), Bin = "S12",Description ="Shorthand Book (80 pg)",UoM="Each",ReorderLevel=100,ReorderQty=80, Category = categories.Where(c => c.Name == "Shorthand").FirstOrDefault()},
                new Item {Id = Guid.NewGuid(), Bin = "S20",Description ="Stapler No. 28",UoM="Each",ReorderLevel=50,ReorderQty=20, Category = categories.Where(c => c.Name == "Stapler").FirstOrDefault()},
                new Item {Id = Guid.NewGuid(), Bin = "S21",Description ="Stapler No. 36",UoM="Each",ReorderLevel=50,ReorderQty=20, Category = categories.Where(c => c.Name == "Stapler").FirstOrDefault()},
                new Item {Id = Guid.NewGuid(), Bin = "S22",Description ="Stapler No. 28",UoM="Box",ReorderLevel=50,ReorderQty=20, Category = categories.Where(c => c.Name == "Stapler").FirstOrDefault()},
                new Item {Id = Guid.NewGuid(), Bin = "S23",Description ="Stapler No. 36",UoM="Box",ReorderLevel=50,ReorderQty=20, Category = categories.Where(c => c.Name == "Stapler").FirstOrDefault()},
                new Item {Id = Guid.NewGuid(), Bin = "T1",Description ="Thumb Tacks Large",UoM="Box",ReorderLevel=10,ReorderQty=10, Category = categories.Where(c => c.Name == "Tacks").FirstOrDefault()},
                new Item {Id = Guid.NewGuid(), Bin = "T2",Description ="Thumb Tacks Medium",UoM="Box",ReorderLevel=10,ReorderQty=10, Category = categories.Where(c => c.Name == "Tacks").FirstOrDefault()},
                new Item {Id = Guid.NewGuid(), Bin = "T3",Description ="Thumb Tacks Small",UoM="Box",ReorderLevel=10,ReorderQty=10, Category = categories.Where(c => c.Name == "Tacks").FirstOrDefault()},
                new Item {Id = Guid.NewGuid(), Bin = "T20",Description ="Transparency Blue",UoM="Box",ReorderLevel=100,ReorderQty=200, Category = categories.Where(c => c.Name == "Tparency").FirstOrDefault()},
                new Item {Id = Guid.NewGuid(), Bin = "T21",Description ="Transparency Clear",UoM="Box",ReorderLevel=500,ReorderQty=400, Category = categories.Where(c => c.Name == "Tparency").FirstOrDefault()},
                new Item {Id = Guid.NewGuid(), Bin = "T22",Description ="Transparency Green",UoM="Box",ReorderLevel=100,ReorderQty=200, Category = categories.Where(c => c.Name == "Tparency").FirstOrDefault()},
                new Item {Id = Guid.NewGuid(), Bin = "T23",Description ="Transparency Red",UoM="Box",ReorderLevel=100,ReorderQty=200, Category = categories.Where(c => c.Name == "Tparency").FirstOrDefault()},
                new Item {Id = Guid.NewGuid(), Bin = "T24",Description ="Transparency Reverse Blue",UoM="Box",ReorderLevel=100,ReorderQty=200, Category = categories.Where(c => c.Name == "Tparency").FirstOrDefault()},
                new Item {Id = Guid.NewGuid(), Bin = "T25",Description ="Transparency Cover 3M",UoM="Box",ReorderLevel=500,ReorderQty=400, Category = categories.Where(c => c.Name == "Tparency").FirstOrDefault()},
                new Item {Id = Guid.NewGuid(), Bin = "T100",Description ="Trays In/Out",UoM="Set",ReorderLevel=20,ReorderQty=10, Category = categories.Where(c => c.Name == "Tray").FirstOrDefault()},

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