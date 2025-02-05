using Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;

namespace Persistence.Data.Seed.SeedChild
{
    public static class SeedProductItem
    {
         public static void Seed(this IServiceProvider serviceProvider)
         {
              using (var context = new ApplicationDbContext(serviceProvider
                    .GetRequiredService<DbContextOptions<ApplicationDbContext>>()))
              {
                   if (!context.ProductItems.Any())
                   {
                        var productItems = new List<ProductItem>
                        {
                            //Giày Tây
                            new ProductItem
                            {
                                Id = Guid.Parse("feb388bc-4cf4-4e2d-96bb-dbc41badfe20"),
                                SKU = "SH-EmLe-41", // sản phẩm - chất liệu - size
                                Image ="https://bizweb.dktcdn.net/thumb/1024x1024/100/292/624/products/dscf8517.jpg?v=1715778152663",
                                Price = 1550000,
                                ProductId = Guid.Parse("e0fbc4ec-9d8f-4fbe-a8e3-c267316c65b5"),
                            },
                            
                            new ProductItem
                            {
                                Id = Guid.Parse("82aa028a-99a0-4d10-9751-103b813a98dc"),
                                SKU = "SH-EmLe-42",
                                Image ="https://bizweb.dktcdn.net/thumb/1024x1024/100/292/624/products/dscf8517.jpg?v=1715778152663",
                                Price = 1550000,
                                ProductId = Guid.Parse("e0fbc4ec-9d8f-4fbe-a8e3-c267316c65b5"),
                            },

                            new ProductItem
                            {
                                Id = Guid.Parse("2b65cca8-4da8-4701-b7d7-d18b0cb1f654"),
                                SKU = "SH-EmLe-43",
                                Image ="https://bizweb.dktcdn.net/thumb/1024x1024/100/292/624/products/dscf8517.jpg?v=1715778152663",
                                Price = 1550000,
                                ProductId = Guid.Parse("e0fbc4ec-9d8f-4fbe-a8e3-c267316c65b5"),
                            },

                            new ProductItem
                            {
                                Id = Guid.Parse("c12eafb9-b310-41f3-b185-b49d82b816dd"),
                                SKU = "SH-SaLe-41", // sản phẩm - chất liệu - size
                                Image ="https://bizweb.dktcdn.net/thumb/1024x1024/100/292/624/products/dscf8517.jpg?v=1715778152663",
                                Price = 1550000,
                                ProductId = Guid.Parse("e0fbc4ec-9d8f-4fbe-a8e3-c267316c65b5"),
                            },

                            new ProductItem
                            {
                                Id = Guid.Parse("8a639eb9-cd66-4251-95db-7b7faef15983"),
                                SKU = "SH-SaLe-42",
                                Image ="https://bizweb.dktcdn.net/thumb/1024x1024/100/292/624/products/dscf8517.jpg?v=1715778152663",
                                Price = 1550000,
                                ProductId = Guid.Parse("e0fbc4ec-9d8f-4fbe-a8e3-c267316c65b5"),
                            },

                            new ProductItem
                            {
                                Id = Guid.Parse("1ded3f47-d3c2-48f3-b1e2-7435d1f50187"),
                                SKU = "SH-SaLe-43",
                                Image ="https://bizweb.dktcdn.net/thumb/1024x1024/100/292/624/products/dscf8517.jpg?v=1715778152663",
                                Price = 1550000,
                                ProductId = Guid.Parse("e0fbc4ec-9d8f-4fbe-a8e3-c267316c65b5"),
                            },

                            new ProductItem
                            {
                                Id = Guid.Parse("7008d0cf-d60c-4d66-8b19-90642e656cf6"),
                                SKU = "SH-SuLe-41", // sản phẩm - chất liệu - size
                                Image ="https://bizweb.dktcdn.net/thumb/1024x1024/100/292/624/products/dscf8517.jpg?v=1715778152663",
                                Price = 1540000,
                                ProductId = Guid.Parse("e0fbc4ec-9d8f-4fbe-a8e3-c267316c65b5"),
                            },

                            new ProductItem
                            {
                                Id = Guid.Parse("109fa265-265f-4ce6-986b-8d7e44ba28e7"),
                                SKU = "SH-SuLe-42",
                                Image ="https://bizweb.dktcdn.net/thumb/1024x1024/100/292/624/products/dscf8517.jpg?v=1715778152663",
                                Price = 1550000,
                                ProductId = Guid.Parse("e0fbc4ec-9d8f-4fbe-a8e3-c267316c65b5"),
                            },

                            new ProductItem
                            {
                                Id = Guid.Parse("790ed0f5-7368-4b85-a17c-7728afcc4b42"),
                                SKU = "SH-SuLe-43",
                                Image ="https://bizweb.dktcdn.net/thumb/1024x1024/100/292/624/products/dscf8517.jpg?v=1715778152663",
                                Price = 1560000,
                                ProductId = Guid.Parse("e0fbc4ec-9d8f-4fbe-a8e3-c267316c65b5"),
                            },
                        }; 
                        context.ProductItems.AddRange(productItems);
                        context.SaveChanges();
                   }
              } 
         } 
    }
}
