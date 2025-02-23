using Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;

namespace Persistence.Data.Seed.SeedChild
{
    public static class SeedCategory
    {
        public static void Seed(this IServiceProvider serviceProvider)
        {
            using (var context = new ApplicationDbContext(serviceProvider
                .GetRequiredService<DbContextOptions<ApplicationDbContext>>()))
            {
                if (!context.Categories.Any())
                {
                    var categories = new List<Category>
                    {
                         new Category { Id =Guid.Parse("2c9313bb-015b-4057-b09e-b2870f284191"),
                             Name = "Giày Tây" },
                         new Category { Id =Guid.Parse("3c9313cc-015b-4057-b09e-b2870f284191"), 
                             Name = "Giày Thể Thao" },
                         new Category { Id =Guid.Parse("4c9313dd-015b-4057-b09e-b2870f284191"), 
                             Name = "Giày Cao gót nữ" }
                    };
                    context.Categories.AddRange(categories);
                    context.SaveChanges();
                }
            }
        }
    }
}
