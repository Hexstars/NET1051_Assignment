using Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;

namespace Persistence.Data.Seed.SeedChild
{
    public static class SeedProduct
    {
        public static void Seed(this IServiceProvider serviceProvider)
        {
            using (var context = new ApplicationDbContext(serviceProvider
                .GetRequiredService<DbContextOptions<ApplicationDbContext>>()))
            {
                if (!context.Products.Any())
                {
                    var categories = new List<Product>
                    {
                        new Product 
                        {
                            Id = Guid.Parse("be8565b4-e3bb-440d-ab73-25c4b9d42274"), 
                            Name = " Giày Samba OG", 
                            Price = 2700000,
                            Description = "Đôi giày classic bằng da mềm mại với mũi giày chữ T bằng da lộn", 
                            Image = "https://assets.adidas.com/images/h_840,f_auto,q_auto,fl_lossy,c_fill,g_auto/ae18d1d2cc71439a823acb9db272d85e_9366/Giay_Samba_OG_DJen_IE3438.jpg", 
                            CategoryId = Guid.Parse("3c9313cc-015b-4057-b09e-b2870f284191"), 
                            BrandId = Guid.Parse("a4713390-32d1-4199-aa6e-1ee1a47ae468"),
                            CreatedDate = DateTime.UtcNow,
                            UpdatedDate = DateTime.UtcNow
                        },
                        new Product {
                            Id = Guid.Parse("4b6ebcdd-f764-4cf5-83e8-ac6613c8c5f1"), 
                            Name = "Giày Trainer Ultraboost 5X Mercedes ", 
                            Price = 5000000, 
                            Description = "Đôi giày trainer chạy bộ chuyên dụng đến từ adidas Motorsports, có sử dụng chất liệu tái chế.", 
                            Image = "https://assets.adidas.com/images/h_2000,f_auto,q_auto,fl_lossy,c_fill,g_auto/ca43fa0a38bf4eb683b3898d2981ea85_9366/Giay_Trainer_Ultraboost_5X_Mercedes_-_AMG_Petronas_Formula_One_Team_DJen_JR9386_HM1.jpg", 
                            CategoryId = Guid.Parse("3c9313cc-015b-4057-b09e-b2870f284191"),
                            BrandId = Guid.Parse("a4713390-32d1-4199-aa6e-1ee1a47ae468"),
                            CreatedDate = DateTime.UtcNow,
                            UpdatedDate = DateTime.UtcNow
                        }
                    };
                    context.Products.AddRange(categories);
                    context.SaveChanges();
                }
            }
        }
    }
}
