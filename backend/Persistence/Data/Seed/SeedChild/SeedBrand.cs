using Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Persistence.Data.Seed.SeedChild
{
    public static class SeedBrand
    {
        public static void Seed(this IServiceProvider serviceProvider)
        {
            using (var context = new ApplicationDbContext(serviceProvider
                .GetRequiredService<DbContextOptions<ApplicationDbContext>>()))
            {
                if (!context.Brands.Any())
                {
                    var brands = new List<Brand>
                    {
                         new Brand 
                         { 
                             Id =Guid.Parse("a4713390-32d1-4199-aa6e-1ee1a47ae468"),
                             Name = "Adidas" 
                         },
                         new Brand 
                         { 
                             Id =Guid.Parse("45e1d2aa-c658-466f-ba8c-872ae3972fb7"),
                             Name = "Nike" 
                         },
                         new Brand 
                         { 
                             Id =Guid.Parse("3117e4a7-53af-48ae-99f0-ad024627e549"),
                             Name = "Puma" 
                         }
                    };
                    context.Brands.AddRange(brands);
                    context.SaveChanges();
                }
            }
        }
    }
}
