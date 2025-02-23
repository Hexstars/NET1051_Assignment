using Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;

namespace Persistence.Data.Seed.SeedChild
{
    public static class SeedSize
    {
        public static void Seed(this IServiceProvider serviceProvider)
        {
            using (var context = new ApplicationDbContext(serviceProvider
                .GetRequiredService<DbContextOptions<ApplicationDbContext>>()))
            {
                if (!context.Sizes.Any())
                {
                    var sizes = new List<Size>
                    {
                         new Size
                         {
                             Id =Guid.Parse("1540d627-a396-43d6-a1e2-1c5d7429998e"),
                             Name = "40"
                         },
                         new Size
                         {
                             Id =Guid.Parse("073125c1-b09f-46d1-a0e7-d846ea6beaf3"),
                             Name = "41"
                         },
                         new Size
                         {
                             Id =Guid.Parse("36a90ce1-b01c-4883-8f1e-7f01cdba0cff"),
                             Name = "42"
                         }
                    };
                    context.Sizes.AddRange(sizes);
                    context.SaveChanges();
                }
            }
        }
    }
}
