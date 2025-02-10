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
    
    public static class SeedMaterial
    {
        public static void Seed(this IServiceProvider serviceProvider)
        {
            using (var context = new ApplicationDbContext(serviceProvider
                .GetRequiredService<DbContextOptions<ApplicationDbContext>>()))
            {
                if (!context.Materials.Any())
                {
                    var materials = new List<Material>
                    {
                         new Material
                         {
                             Id =Guid.Parse("12953f79-e4ff-4d52-8c04-ce19f149810b"),
                             Name = "Da"
                         },
                         new Material
                         {
                             Id =Guid.Parse("ab855e42-e7b2-4d4e-9a6d-1fb6898ca1a5"),
                             Name = "Vải"
                         },
                         new Material
                         {
                             Id =Guid.Parse("9993a868-03bc-4ad3-92e0-9804564440ee"),
                             Name = "Vải lưới"
                         }
                    };
                    context.Materials.AddRange(materials);
                    context.SaveChanges();
                }
            }
        }
    }
}
