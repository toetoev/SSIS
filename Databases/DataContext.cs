using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using SSIS.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SSIS.Databases
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions<DataContext> options) : base(options) { }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<StoreStaff>(entity => { entity.HasIndex(e => e.Email).IsUnique(); });
        }

        public DbSet<StoreStaff> StoreStaffs { get; set; }
    }
}
