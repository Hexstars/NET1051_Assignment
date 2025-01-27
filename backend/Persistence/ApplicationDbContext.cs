using Domain.Entities;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace Persistence
{
    public class ApplicationDbContext : IdentityDbContext<ApplicationUser, ApplicationRole, Guid>
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
            : base(options) { }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<ProductConfiguration>()
                .HasKey(pc => new { pc.Id });

            // Ràng buộc quan hệ với ProductItem
            modelBuilder.Entity<ProductConfiguration>()
                .HasOne(pc => pc.ProductItem)
                .WithMany(pi => pi.ProductConfigurations)
                .HasForeignKey(pc => pc.ProductItemId)
                .OnDelete(DeleteBehavior.Restrict);

            // Ràng buộc quan hệ với VariationOption
            modelBuilder.Entity<ProductConfiguration>()
                .HasOne(pc => pc.VariationOption)
                .WithMany(vo => vo.ProductConfigurations)
                .HasForeignKey(pc => pc.VariationOptionId)
                .OnDelete(DeleteBehavior.Restrict);

            base.OnModelCreating(modelBuilder);
        }

        public DbSet<Category> Categories { get; set; }
        public DbSet<Cart> Carts { get; set; }
        public DbSet<CartItem> CartItems { get; set; }
        public DbSet<Order> Orders { get; set; }
        public DbSet<OrderItem> OrderItems { get; set; }
        public DbSet<Product> Products { get; set; }
        public DbSet<ProductItem> ProductItems { get; set; }
        public DbSet<Variation> Variations { get; set; }
        public DbSet<VariationOption> VariationOptions { get; set; }
        public DbSet<ProductConfiguration> ProductConfigurations { get; set; }
    }
}
