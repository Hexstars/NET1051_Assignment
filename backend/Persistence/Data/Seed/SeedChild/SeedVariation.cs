using Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;

namespace Persistence.Data.Seed.SeedChild
{
    public static class SeedVariation
    {
        public static void Seed(this IServiceProvider serviceProvider)
        {
            using (var context = new ApplicationDbContext(serviceProvider
                .GetRequiredService<DbContextOptions<ApplicationDbContext>>()))
            {
                if (!context.Variations.Any())
                {
                    var variations = new List<Variation>
                    {
                        //Giày Tây
                        new Variation 
                        { Id = Guid.Parse("feb388bc-4cf4-4e2d-96bb-dbc41badfe20"), Name = "Size", 
                            CategoryId = Guid.Parse("2c9313bb-015b-4057-b09e-b2870f284191") },
                        new Variation
                        { Id = Guid.Parse("eb7f74fe-bdbd-4e3d-8932-63d0f49d5369"), Name = "Material",
                            CategoryId = Guid.Parse("2c9313bb-015b-4057-b09e-b2870f284191") },
                       
                        // Giày thể thao
                        new Variation
                        { Id = Guid.Parse("f1ba7ba4-9601-4205-91a6-a3529a98b52c"), Name = "Size",
                            CategoryId = Guid.Parse("3c9313cc-015b-4057-b09e-b2870f284191") },
                        new Variation
                        { Id = Guid.Parse("c1a51273-aa95-4dd0-b11a-4ee7cec2979d"), Name = "Material",
                            CategoryId = Guid.Parse("3c9313cc-015b-4057-b09e-b2870f284191") },

                        // Giày cao gót nữ
                        new Variation
                        { Id = Guid.Parse("e5f9c3eb-ecbb-4022-9ef1-3c360a583e27"), Name = "Size",
                            CategoryId = Guid.Parse("4c9313dd-015b-4057-b09e-b2870f284191") },
                        new Variation
                        { Id = Guid.Parse("39e24347-f197-43d4-9376-1abf8b9be9ed"), Name = "Material",
                            CategoryId = Guid.Parse("4c9313dd-015b-4057-b09e-b2870f284191") },
                    };
                    context.Variations.AddRange(variations);
                    context.SaveChanges();
                }
            }
        }
    }
}
