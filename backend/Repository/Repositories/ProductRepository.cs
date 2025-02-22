using Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Persistence;
using Repository.Repositories.Base;
using Services.Contracts.Repositories;
using Services.Models.Product;

namespace Repository.Repositories
{
    public class ProductRepository : GeneralRepository<Product, Guid>, IProductRepository
    {
        public ProductRepository(ApplicationDbContext context) : base(context) { }

        public async Task<(IEnumerable<ProductViewModel> products, int TotalCount)>
            GetProductsWithItems(int currentPage, int pageSize)
        {
            int pageIndex = currentPage - 1;

            // Đếm tổng số sản phẩm để tính số trang
            int totalCount = await _context.Products.CountAsync();

            // Lấy dữ liệu cho trang hiện tại
            var listProducts = _context.Products
            .Where(p => p.IsActive) // Chỉ lấy sản phẩm đang hoạt động
            .Select(p => new ProductViewModel
            {
                ProductId = p.Id,
                ProductName = p.Name,
                Description = p.Description,
                ProductImage = p.Image,
                BasePrice = p.Price,
                BrandId = p.BrandId,
                BrandName = p.Brand.Name,
                CategoryId = p.CategoryId,
                CategoryName = p.Category.Name,
                CreatedDate = p.CreatedDate,
                UpdatedDate = p.UpdatedDate,
                IsActive = p.IsActive,
                ProductItems = _context.ProductItems
                    .Where(pi => pi.ProductId == p.Id && pi.IsActive)
                    .Select(pi => new ProductItemModel
                    {
                        ProductItemId = pi.Id,
                        SKU = pi.SKU,
                        Price = pi.Price,
                        Image = pi.Image,
                        Color = pi.Color != null ? pi.Color.Name : "N/A",
                        Size = pi.Size != null ? pi.Size.Name : "N/A",
                        Material = pi.Material != null ? pi.Material.Name : "N/A"
                    }).ToList()
            })
            .ToList();
            return (listProducts, totalCount);
        }
        public async Task<ProductViewModel?> GetProductById(Guid id)
        {
            return await _context.Products
                .Where(p => p.Id == id && p.IsActive)
                .Select(p => new ProductViewModel
                {
                    ProductId = p.Id,
                    ProductName = p.Name,
                    Description = p.Description,
                    ProductImage = p.Image,
                    BasePrice = p.Price,
                    CategoryId = p.CategoryId,
                    CategoryName = p.Category.Name,
                    BrandId = p.BrandId,
                    BrandName = p.Brand.Name,
                    CreatedDate = p.CreatedDate,
                    UpdatedDate = p.UpdatedDate,
                    IsActive = p.IsActive,
                    ProductItems = p.ProductItems
                        .Where(pi => pi.IsActive)
                        .Select(pi => new ProductItemModel
                        {
                            ProductItemId = pi.Id,
                            SKU = pi.SKU,
                            Price = pi.Price,
                            Image = pi.Image,
                            Color = pi.Color != null ? pi.Color.Name : "N/A",
                            Size = pi.Size != null ? pi.Size.Name : "N/A",
                            Material = pi.Material != null ? pi.Material.Name : "N/A"
                        }).ToList()
                })
                .FirstOrDefaultAsync();
        }

        public async Task<Product> CreateProduct(ProductCreateModel model)
        {
            var product = new Product
            {
                Id = Guid.NewGuid(),
                Name = model.Name,
                Price = model.Price,
                Description = model.Description,
                Image = model.Image,
                BrandId = model.BrandId,
                CategoryId = model.CategoryId,
                CreatedDate = DateTime.UtcNow,
                UpdatedDate = DateTime.UtcNow,
                IsActive = true
            };

            _context.Products.Add(product);
            await _context.SaveChangesAsync();
            return product;
        }

        public async Task<bool> UpdateProduct(ProductUpdateModel model)
        {
            var existingProduct = await _context.Products.FindAsync(model.Id);
            if (existingProduct == null) return false;

            existingProduct.Name = model.Name;
            existingProduct.Description = model.Description;
            existingProduct.Price = (decimal)model.Price;
            existingProduct.Image = model.Image;
            existingProduct.CategoryId = model.CategoryId;
            existingProduct.BrandId = model.BrandId;
            existingProduct.UpdatedDate = DateTime.UtcNow;

            await _context.SaveChangesAsync();
            return true;
        }

        public async Task<bool> DeleteProduct(Guid productId)
        {
            var product = await _context.Products.FindAsync(productId);
            if (product == null) return false;

            product.IsActive = false;
            await _context.SaveChangesAsync();
            return true;
        }
    }
}
