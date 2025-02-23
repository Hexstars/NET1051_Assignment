using Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;


namespace Persistence.Data.Seed.SeedChild
{
    public static class SeedColor
    {
        public static void Seed(this IServiceProvider serviceProvider)
        {
            using (var context = new ApplicationDbContext(serviceProvider
                .GetRequiredService<DbContextOptions<ApplicationDbContext>>()))
            {
                if (!context.Colors.Any())
                {
                    var colors = new List<Color>
                    {
                         new Color
                         {
                             Id =Guid.Parse("76f2e2ec-67b2-4fcd-b4c7-15fa5f3ba116"),
                             Name = "Đen"
                         },
                         new Color
                         {
                             Id =Guid.Parse("d96871fd-d6ad-4cb2-92c5-5c6874cffc30"),
                             Name = "Trắng"
                         },
                         new Color
                         {
                             Id =Guid.Parse("337442f4-9da9-4a98-add0-58cfb4843a6f"),
                             Name = "Xanh"
                         }
                    };
                    context.Colors.AddRange(colors);
                    context.SaveChanges();
                }
            }
        }
    }
}
