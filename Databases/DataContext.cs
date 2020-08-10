using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using SSIS.Models;

namespace SSIS.Databases
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions<DataContext> options) : base(options) { }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<StoreStaff>(entity => { entity.HasIndex(e => e.Email).IsUnique(); });
            modelBuilder.Entity<DeptStaff>()
                        .HasOne(e => e.Department)
                        .WithOne(e => e.DeptRep)
                        .HasForeignKey<Department>(e => e.DeptRepId);
            modelBuilder.Seed();
        }

        public DbSet<StoreStaff> StoreStaffs { get; set; }
        public DbSet<DeptStaff> DeptStaffs { get; set; }
        public DbSet<Department> Departments { get; set; }
        public DbSet<CollectionPoint> CollectionPoints { get; set; }

    }
}