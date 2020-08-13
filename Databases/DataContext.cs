using Microsoft.EntityFrameworkCore;
using SSIS.Models;

namespace SSIS.Databases
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions<DataContext> options) : base(options) { }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<RequisitionItem>().HasKey(ri => new { ri.ItemId, ri.RequisitionId });
            modelBuilder.Entity<SupplyTenderItem>().HasKey(sti => new { sti.ItemId, sti.SupplierId });
            modelBuilder.Entity<RetrievalItem>().HasKey(ri => new { ri.ItemId, ri.RetrievalId });
            modelBuilder.Entity<AdjustmentItem>().HasKey(ai => new { ai.ItemId, ai.AdjustmentId });
            modelBuilder.Entity<OrderItem>().HasKey(oi => new { oi.ItemId, oi.OrderId });
            modelBuilder.Entity<Delegation>().HasKey(d => new { d.DelegatedByEmail, d.StartDate });
            modelBuilder.Entity<Requisition>().HasOne(r => r.RequestedBy).WithMany(ds => ds.RequestedRequisitions).HasForeignKey(r => r.RequestedByEmail);
            modelBuilder.Entity<Requisition>().HasOne(r => r.ReviewedBy).WithMany(ds => ds.ReviewedRequisitions).HasForeignKey(r => r.ReviewedByEmail);
            modelBuilder.Entity<Requisition>().HasOne(r => r.AcknowledgedBy).WithMany(ds => ds.AcknowledgedRequisitions).HasForeignKey(r => r.AcknowledgedByEmail);
            modelBuilder.Entity<Adjustment>().HasOne(a => a.SubmittedBy).WithMany(ss => ss.SubmittedAdjustments).HasForeignKey(a => a.SubmittedByEmail);
            modelBuilder.Entity<Adjustment>().HasOne(a => a.IssuedBy).WithMany(ss => ss.IssuedAdjustments).HasForeignKey(a => a.IssuedByEmail);
            modelBuilder.Entity<Order>().HasOne(o => o.OrderedBy).WithMany(ss => ss.OrderedOrders).HasForeignKey(o => o.OrderedByEmail);
            modelBuilder.Entity<Order>().HasOne(o => o.ReceivedBy).WithMany(ss => ss.ReceivedOrders).HasForeignKey(o => o.ReceivedByEmail);
            modelBuilder.Entity<Delegation>().HasOne(d => d.DelegatedBy).WithMany(ds => ds.DelegatedByDelegations).HasForeignKey(d => d.DelegatedByEmail);
            modelBuilder.Entity<Delegation>().HasOne(d => d.DelegatedTo).WithMany(ds => ds.DelegatedToDelegations).HasForeignKey(d => d.DelegatedToEmail);
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
        public DbSet<Retrieval> Retrievals { get; set; }
        public DbSet<RetrievalItem> RetrievalItems { get; set; }
        public DbSet<Adjustment> Adjustments { get; set; }
        public DbSet<AdjustmentItem> AdjustmentItems { get; set; }
        public DbSet<Order> Orders { get; set; }
        public DbSet<OrderItem> OrderItems { get; set; }
        public DbSet<Delegation> Delegations { get; set; }

    }
}