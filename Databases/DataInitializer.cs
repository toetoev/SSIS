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
                // new Item {Bin = "C1",Description ="Clips Double 1\"",UoM="Dozen",ReorderLevel=50,ReorderQty=30, Category = categories.Where(c => c.Name == "Clip").FirstOrDefault()},
                new Item("C1", "Clips Double 1\"", "Dozen", 50, 30, categories.Where(c => c.Name == "Clip").Single()),
                new Item("C2", "Clips Double 2\"", "Dozen", 50, 30, categories.Where(c => c.Name == "Clip").Single()),
                new Item("C3", "Clips Double 3/4\"", "Dozen", 50, 30, categories.Where(c => c.Name == "Clip").Single()),
                new Item("C4", "Clips Paper Large", "Box", 50, 30, categories.Where(c => c.Name == "Clip").Single()),
                new Item("C5", "Clips Paper Medium ", "Box", 50, 30, categories.Where(c => c.Name == "Clip").Single()),
                new Item("C6", "Clips Paper Small", "Box", 50, 30, categories.Where(c => c.Name == "Clip").Single()),
                new Item("E1", "Envelope Brown (3\"x6\")", "Each", 600, 400, categories.Where(c => c.Name == "Envelope").Single()),
                new Item("E2", "Envelope Brown (3\"x6\") w/ Window", "Each", 600, 400, categories.Where(c => c.Name == "Envelope").Single()),
                new Item("E3", "Envelope Brown (5\"x7\")", "Each", 600, 400, categories.Where(c => c.Name == "Envelope").Single()),
                new Item("E4", "Envelope Brown (5\"x7\") w/ Window", "Each", 600, 400, categories.Where(c => c.Name == "Envelope").Single()),
                new Item("E5", "Envelope White (3\"x6\")", "Each", 600, 400, categories.Where(c => c.Name == "Envelope").Single()),
                new Item("E6", "Envelope White (3\"x6\") w/ Window", "Each", 600, 400, categories.Where(c => c.Name == "Envelope").Single()),
                new Item("E7", "Envelope White (5\"x7\")", "Each", 600, 400, categories.Where(c => c.Name == "Envelope").Single()),
                new Item("E8", "Envelope White (5\"x7\") w/ Window", "Each", 600, 400, categories.Where(c => c.Name == "Envelope").Single()),
                new Item("E20", "Eraser (hard)", "Each", 50, 20, categories.Where(c => c.Name == "Eraser").Single()),
                new Item("E21", "Eraser (soft)", "Each", 50, 20, categories.Where(c => c.Name == "Eraser").Single()),
                new Item("E30", "Exercise Book (100 pg)", "Each", 100, 50, categories.Where(c => c.Name == "Exercise").Single()),
                new Item("E31", "Exercise Book (120 pg)", "Each", 100, 50, categories.Where(c => c.Name == "Exercise").Single()),
                new Item("E32", "Exercise Book A4 Hardcover (100 pg)", "Each", 100, 50, categories.Where(c => c.Name == "Exercise").Single()),
                new Item("E33", "Exercise Book A4 Hardcover (120 pg)", "Each", 100, 50, categories.Where(c => c.Name == "Exercise").Single()),
                new Item("E34", "Exercise Book A4 Hardcover (200 pg)", "Each", 100, 50, categories.Where(c => c.Name == "Exercise").Single()),
                new Item("E35", "Exercise Book Hardcover (100 pg)", "Each", 100, 50, categories.Where(c => c.Name == "Exercise").Single()),
                new Item("E36", "Exercise Book Hardcover (120 pg)", "Each", 100, 50, categories.Where(c => c.Name == "Exercise").Single()),
                new Item("F20", "File Separator", "Set", 100, 50, categories.Where(c => c.Name == "File").Single()),
                new Item("F21", "File-Blue Plain", "Each", 200, 100, categories.Where(c => c.Name == "File").Single()),
                new Item("F22", "File-Blue with Logo", "Each", 200, 100, categories.Where(c => c.Name == "File").Single()),
                new Item("F23", "File-Brown w/o Logo", "Each", 200, 150, categories.Where(c => c.Name == "File").Single()),
                new Item("F24", "File-Brown with Logo", "Each", 200, 150, categories.Where(c => c.Name == "File").Single()),
                new Item("F31", "Folder Plastic Blue", "Each", 200, 150, categories.Where(c => c.Name == "File").Single()),
                new Item("F32", "Folder Plastic Clear", "Each", 200, 150, categories.Where(c => c.Name == "File").Single()),
                new Item("F33", "Folder Plastic Green", "Each", 200, 150, categories.Where(c => c.Name == "File").Single()),
                new Item("F34", "Folder Plastic Pink", "Each", 200, 150, categories.Where(c => c.Name == "File").Single()),
                new Item("F35", "Folder Plastic Yellow", "Each", 200, 150, categories.Where(c => c.Name == "File").Single()),
                new Item("H11", "Highlighter Blue", "Box", 100, 80, categories.Where(c => c.Name == "Pen").Single()),
                new Item("H12", "Highlighter Green", "Box", 100, 80, categories.Where(c => c.Name == "Pen").Single()),
                new Item("H13", "Highlighter Pink", "Box", 100, 80, categories.Where(c => c.Name == "Pen").Single()),
                new Item("H14", "Highlighter Yellow", "Box", 100, 80, categories.Where(c => c.Name == "Pen").Single()),
                new Item("H31", "Hole Puncher 2 holes", "Each", 50, 20, categories.Where(c => c.Name == "Puncher").Single()),
                new Item("H32", "Hole Puncher 3 holes", "Each", 50, 20, categories.Where(c => c.Name == "Puncher").Single()),
                new Item("H33", "Hole Puncher Adjustable", "Each", 50, 20, categories.Where(c => c.Name == "Puncher").Single()),
                new Item("P10", "Pad Postit Memo 1\"x2\"", "Packet", 100, 60, categories.Where(c => c.Name == "Pad").Single()),
                new Item("P11", "Pad Postit Memo 1/2\"x1\"", "Packet", 100, 60, categories.Where(c => c.Name == "Pad").Single()),
                new Item("P12", "Pad Postit Memo 1/2\"x2\"", "Packet", 100, 60, categories.Where(c => c.Name == "Pad").Single()),
                new Item("P13", "Pad Postit Memo 2\"x3\"", "Packet", 100, 60, categories.Where(c => c.Name == "Pad").Single()),
                new Item("P14", "Pad Postit Memo 2\"x4\"", "Packet", 100, 60, categories.Where(c => c.Name == "Pad").Single()),
                new Item("P15", "Pad Postit Memo 2\"x4\"", "Packet", 100, 60, categories.Where(c => c.Name == "Pad").Single()),
                new Item("P16", "Pad Postit Memo 3/4\"x2\"", "Packet", 100, 60, categories.Where(c => c.Name == "Pad").Single()),
                new Item("P20", "Paper Photostat A3", "Box", 500, 500, categories.Where(c => c.Name == "Paper").Single()),
                new Item("P21", "Paper Photostat A4", "Box", 500, 500, categories.Where(c => c.Name == "Paper").Single()),
                new Item("P30", "Pen Ballpoint Black", "Dozen", 100, 50, categories.Where(c => c.Name == "Pen").Single()),
                new Item("P31", "Pen Ballpoint Blue", "Dozen", 100, 50, categories.Where(c => c.Name == "Pen").Single()),
                new Item("P32", "Pen Ballpoint Red", "Dozen", 100, 50, categories.Where(c => c.Name == "Pen").Single()),
                new Item("P33", "Pen Felt Tip Black", "Dozen", 100, 50, categories.Where(c => c.Name == "Pen").Single()),
                new Item("P34", "Pen Felt Tip Blue", "Dozen", 100, 50, categories.Where(c => c.Name == "Pen").Single()),
                new Item("P35", "Pen Felt Tip Red", "Dozen", 100, 50, categories.Where(c => c.Name == "Pen").Single()),
                new Item("P36", "Pen Transparency Permanent", "Packet", 100, 50, categories.Where(c => c.Name == "Pen").Single()),
                new Item("P37", "Pen Transparency Soluble", "Packet", 100, 50, categories.Where(c => c.Name == "Pen").Single()),
                new Item("P38", "Pen Whiteboard Marker Black", "Box", 100, 50, categories.Where(c => c.Name == "Pen").Single()),
                new Item("P39", "Pen Whiteboard Marker Blue", "Box", 100, 50, categories.Where(c => c.Name == "Pen").Single()),
                new Item("P40", "Pen Whiteboard Marker Green", "Box", 100, 50, categories.Where(c => c.Name == "Pen").Single()),
                new Item("P41", "Pen Whiteboard Marker Red", "Box", 100, 50, categories.Where(c => c.Name == "Pen").Single()),
                new Item("P42", "Pencil 2B", "Dozen", 100, 50, categories.Where(c => c.Name == "Pen").Single()),
                new Item("P43", "Pencil 2B with Eraser End", "Dozen", 100, 50, categories.Where(c => c.Name == "Pen").Single()),
                new Item("P44", "Pencil 4H ", "Dozen", 100, 50, categories.Where(c => c.Name == "Pen").Single()),
                new Item("P45", "Pencil B", "Dozen", 100, 50, categories.Where(c => c.Name == "Pen").Single()),
                new Item("P46", "Pencil B with Eraser End", "Dozen", 100, 50, categories.Where(c => c.Name == "Pen").Single()),
                new Item("R2", "Ruler 12\"", "Dozen", 50, 20, categories.Where(c => c.Name == "Ruler").Single()),
                new Item("R1", "Ruler 6\"", "Dozen", 50, 20, categories.Where(c => c.Name == "Ruler").Single()),
                new Item("S100", "Scissors", "Each", 50, 20, categories.Where(c => c.Name == "Scissors").Single()),
                new Item("S40", "Scotch Tape", "Each", 50, 20, categories.Where(c => c.Name == "Tape").Single()),
                new Item("S41", "Scotch Tape Dispenser", "Each", 50, 20, categories.Where(c => c.Name == "Tape").Single()),
                new Item("S101", "Sharpener", "Each", 50, 20, categories.Where(c => c.Name == "Sharpener").Single()),
                new Item("S101", "Sharpener", "Each", 50, 20, categories.Where(c => c.Name == "Sharpener").Single()),
                new Item("S101", "Sharpener", "Each", 50, 20, categories.Where(c => c.Name == "Sharpener").Single()),
                new Item("S101", "Sharpener", "Each", 50, 20, categories.Where(c => c.Name == "Sharpener").Single()),
                new Item("S10", "Shorthand Book (100 pg)", "Each", 100, 80, categories.Where(c => c.Name == "Shorthand").Single()),
                new Item("S11", "Shorthand Book (120 pg)", "Each", 100, 80, categories.Where(c => c.Name == "Shorthand").Single()),
                new Item("S12", "Shorthand Book (80 pg)", "Each", 100, 80, categories.Where(c => c.Name == "Shorthand").Single()),
                new Item("S20", "Stapler No. 28", "Each", 50, 20, categories.Where(c => c.Name == "Stapler").Single()),
                new Item("S21", "Stapler No. 36", "Each", 50, 20, categories.Where(c => c.Name == "Stapler").Single()),
                new Item("S22", "Stapler No. 28", "Box", 50, 20, categories.Where(c => c.Name == "Stapler").Single()),
                new Item("S23", "Stapler No. 36", "Box", 50, 20, categories.Where(c => c.Name == "Stapler").Single()),
                new Item("T1", "Thumb Tacks Large", "Box", 10, 10, categories.Where(c => c.Name == "Tacks").Single()),
                new Item("T2", "Thumb Tacks Medium", "Box", 10, 10, categories.Where(c => c.Name == "Tacks").Single()),
                new Item("T3", "Thumb Tacks Small", "Box", 10, 10, categories.Where(c => c.Name == "Tacks").Single()),
                new Item("T20", "Transparency Blue", "Box", 100, 200, categories.Where(c => c.Name == "Tparency").Single()),
                new Item("T21", "Transparency Clear", "Box", 500, 400, categories.Where(c => c.Name == "Tparency").Single()),
                new Item("T22", "Transparency Green", "Box", 100, 200, categories.Where(c => c.Name == "Tparency").Single()),
                new Item("T23", "Transparency Red", "Box", 100, 200, categories.Where(c => c.Name == "Tparency").Single()),
                new Item("T24", "Transparency Reverse Blue", "Box", 100, 200, categories.Where(c => c.Name == "Tparency").Single()),
                new Item("T25", "Transparency Cover 3M", "Box", 500, 400, categories.Where(c => c.Name == "Tparency").Single()),
                new Item("T100", "Trays In/Out", "Set", 20, 10, categories.Where(c => c.Name == "Tray").Single()),

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