using FullStack.API.Models;
using FullStack.API.Models.LoyaltyCust;
using Microsoft.EntityFrameworkCore;

namespace FullStack.API.Data
{
    public class FullStackDbContext :DbContext
    {
        public FullStackDbContext(DbContextOptions options) : base(options)
        {

        }
        public DbSet<Employee> Employees { get; set; }
        public DbSet<LoyaltyCust> LoyaltyCusts { get; set; }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<LoyaltyCust>().ToTable("tblLoyaltyCust");
        }

    }
}
