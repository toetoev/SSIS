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
            modelBuilder.Entity<RequisitionItem>().HasKey(ri => new { ri.ItemId, ri.RequisitionId });
            modelBuilder.Entity<SupplyTenderItem>().HasKey(sti => new { sti.ItemId, sti.SupplierId });
            modelBuilder.Entity<Requisition>()
                .HasOne(r => r.RequestedBy)
                .WithMany(ds => ds.RequestedRequisitions)
                .HasForeignKey(r => r.RequestedByEmail);
            modelBuilder.Entity<Requisition>()
                .HasOne(r => r.ReviewedBy)
                .WithMany(ds => ds.ReviewedRequisitions)
                .HasForeignKey(r => r.ReviewedByEmail);
            modelBuilder.Entity<Requisition>()
                .HasOne(r => r.AcknowledgedBy)
                .WithMany(ds => ds.AcknowledgedRequisitions)
                .HasForeignKey(r => r.AcknowledgedByEmail);
        }

        public DbSet<StoreStaff> StoreStaffs { get; set; }
        public DbSet<DeptStaff> DeptStaffs { get; set; }
        public DbSet<Department> Departments { get; set; }
        public DbSet<CollectionPoint> CollectionPoints { get; set; }
        public DbSet<Requisition> Requisitions { get; set; }
        public DbSet<RequisitionItem> RequisitionItems { get; set; }
        public DbSet<Item> Items { get; set; }
        public DbSet<Category> Categories { get; set; }
        public DbSet<Supplier> Suppliers { get; set; }
        public DbSet<SupplyTenderItem> SupplyTenderItems { get; set; }
    }
}