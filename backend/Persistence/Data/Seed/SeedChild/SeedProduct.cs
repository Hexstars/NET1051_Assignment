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
                    var products = new List<Product>
                    {
                        new Product
                        {
                            Id = Guid.Parse("e0fbc4ec-9d8f-4fbe-a8e3-c267316c65b5"),
                            Name = "TONKIN CAPTOE OXFORD ",
                            Description = "Tonkin Captoe Oxford - " +
                            "biểu tượng vượt thời gian, mang vẻ đẹp cổ điển " +
                            "với phom dáng được duy trì nguyên bản. " +
                            "Thiết kế tuy đơn giản nhưng sang trọng, " +
                            "đôi giày oxford này đã trở thành item không thể “vắng mặt” trong tủ giày " +
                            "của những Quý Ông hiện nay.",
                            Price = 1550000,
                            CategoryId = Guid.Parse("2c9313bb-015b-4057-b09e-b2870f284191"),
                            Image = "https://bizweb.dktcdn.net/thumb/1024x1024/100/292/624/products/dscf8517.jpg?v=1715778152663"
                        },
                        new Product
                        {
                            Id = Guid.Parse("62b07e1b-e37b-4942-9cb6-5a73aa4efbc1"),
                            Name = "Giày Thể Thao Cao Cấp Nam ",
                            Description = "Giày thể thao nam",
                            Price = 765000,
                            CategoryId = Guid.Parse("3c9313cc-015b-4057-b09e-b2870f284191"),
                            Image = "https://product.hstatic.net/1000230642/product/bsm003700xnh__8__4065c36546a943ab98ceab25df79525d_grande.jpg"
                        },
                        new Product
                        {
                            Id = Guid.Parse("c84168f3-80d6-48d8-92c4-c7401f5b8576"),
                            Name = "Giày sandals cao gót quai dây mảnh",
                            Description = "Giày cao gót nữ",
                            Price = 682000,
                            CategoryId = Guid.Parse("4c9313dd-015b-4057-b09e-b2870f284191"),
                            Image="https://www.vascara.com/uploads/cms_productmedia/2024/December/27/giay-sandals-cao-got-quai-day-manh---sdn-0819---mau-do__79774__1735291799-medium.jpg"
                        }
                    };
                    context.Products.AddRange(products);
                    context.SaveChanges();
                }
            } 
        }
    }
}
