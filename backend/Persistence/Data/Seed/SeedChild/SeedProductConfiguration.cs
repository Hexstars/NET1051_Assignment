using Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using System.Data;

namespace Persistence.Data.Seed.SeedChild
{
    public static class SeedProductConfiguration
    {
        public static void Seed(this IServiceProvider serviceProvider)
        {
            using (var context = new ApplicationDbContext(serviceProvider
                .GetRequiredService<DbContextOptions<ApplicationDbContext>>()))
            {
                if (!context.ProductConfigurations.Any())
                {
                    var productConfigurations = new List<ProductConfiguration>
                    {
                        //SH-EmLe
                        new ProductConfiguration
                        {
                            Id = Guid.Parse("d746b7b3-aa6d-4c20-8337-82962e5aa79f"),
                            ProductItemId = Guid.Parse("feb388bc-4cf4-4e2d-96bb-dbc41badfe20"),
                            VariationOptionId = Guid.Parse("511e34d5-8c77-456d-a4dc-231860901395"), //Material
                        },

                         //SH-SaLe
                        new ProductConfiguration
                        {
                            Id = Guid.Parse("aaabeb5a-2e71-4803-b016-cc0f4f76232c"),
                            ProductItemId = Guid.Parse("feb388bc-4cf4-4e2d-96bb-dbc41badfe20"),
                            VariationOptionId = Guid.Parse("33d2bdad-612a-41bd-a71d-7f8e255b2e1e"),
                        },

                        //SH-SuLe
                        new ProductConfiguration
                        {
                            Id = Guid.Parse("94ff8e82-3398-45fe-a73a-a512368d4eaa"),
                            ProductItemId = Guid.Parse("feb388bc-4cf4-4e2d-96bb-dbc41badfe20"),
                            VariationOptionId = Guid.Parse("ab097a3a-433f-4736-927b-0a0f433e9d2e"),
                        },

                        // SH-41
                        new ProductConfiguration
                        {
                            Id = Guid.Parse("c8bd2fac-6adf-4859-a5c0-420c4ad71f13"),
                            ProductItemId = Guid.Parse("feb388bc-4cf4-4e2d-96bb-dbc41badfe20"),
                            VariationOptionId = Guid.Parse("e0fbc4ec-9d8f-4fbe-a8e3-c267316c65b5"),//Size
                        },

                        // SH-42
                        new ProductConfiguration
                        {
                            Id = Guid.Parse("7a43939b-96f7-45bd-8186-c5071a306fd8"),
                            ProductItemId = Guid.Parse("feb388bc-4cf4-4e2d-96bb-dbc41badfe20"),
                            VariationOptionId = Guid.Parse("62b07e1b-e37b-4942-9cb6-5a73aa4efbc1"),
                        },

                        // SH-43
                        new ProductConfiguration
                        {
                            Id = Guid.Parse("61f19cc6-0269-48f4-89ae-575d56fce307"),
                            ProductItemId = Guid.Parse("feb388bc-4cf4-4e2d-96bb-dbc41badfe20"),
                            VariationOptionId = Guid.Parse("c84168f3-80d6-48d8-92c4-c7401f5b8576"),
                        },
                    };
                    context.ProductConfigurations.AddRange(productConfigurations);
                    context.SaveChanges();
                }
            }
        } 
    }
}
