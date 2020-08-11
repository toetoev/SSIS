using System;
using Microsoft.EntityFrameworkCore;
using SSIS.Models;

namespace SSIS.Databases
{
    public static class DataInitializer
    {
        public static void Seed(this ModelBuilder modelBuilder)
        {
            string[] collectionPointLocations = {
                "Stationery Store - Administration Building (9:30am)",
                "Management School (11:00am)",
                "Medical School (9:30am) ",
                "Engineering School (11:00am)",
                "Science School (9:30am)",
                "University Hospital (11:00am)"
            };
            Array.ForEach(collectionPointLocations, el => modelBuilder.Entity<CollectionPoint>().HasData(new CollectionPoint { Location = el }));

            string[] departments = {
                "Computer Science",
                "Medical",
                "Math",
                "Law"
            };
            Array.ForEach(departments, el => modelBuilder.Entity<Department>().HasData(new Department { Name = el, CollectionPointId = null }));
        }
    }
}