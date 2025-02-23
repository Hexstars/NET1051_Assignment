using Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Persistence;
using Repository.Repositories.Base;
using Services.Contracts.Repositories;
using Services.Models.Product;
using Services.Models.ProductItem;

namespace Repository.Repositories
{
    public class ProductItemRepository : GeneralRepository<ProductItem, Guid>, IProductitemRepository
    {

        public ProductItemRepository(ApplicationDbContext context) : base(context) { }

        public async Task<(IEnumerable<ProductItemViewModel> Items, int TotalItems)>
     GetProductsWithItems(int currentPage, int pageSize)
        {
            // Đếm tổng số sản phẩm
            int totalItems = await _context.ProductItems.CountAsync();

            var items = await _context.ProductItems
                .Include(p => p.Product)
                .Include(p => p.Size)
                .Include(p => p.Color)
                .Include(p => p.Material)
                .Select(p => new ProductItemViewModel
                {
                    Id = p.Id,
                    SKU = p.SKU,
                    Image = p.Image,
                    Price = p.Price,
                    ProductId = p.ProductId,
                    ProductName = p.Product.Name,
                    SizeId = p.SizeId,
                    SizeName = p.Size.Name,
                    ColorId = p.ColorId,
                    ColorName = p.Color.Name,
                    MaterialId = p.MaterialId,
                    MaterialName = p.Material.Name
                })
                .Skip((currentPage - 1) * pageSize)
                .Take(pageSize)
                .ToListAsync();

            return (items, totalItems);
        }


        public async Task<ProductItemViewModel?> GetByIdAsync(Guid id)
        {
            return await _context.ProductItems
                .Include(p => p.Product)
                .Include(p => p.Size)
                .Include(p => p.Color)
                .Include(p => p.Material)
                .Where(p => p.Id == id)
                .Select(p => new ProductItemViewModel
                {
                    Id = p.Id,
                    SKU = p.SKU,
                    Image = p.Image,
                    Price = p.Price,
                    ProductId = p.ProductId,
                    ProductName = p.Product.Name,
                    SizeId = p.SizeId,
                    SizeName = p.Size.Name,
                    ColorId = p.ColorId,
                    ColorName = p.Color.Name,
                    MaterialId = p.MaterialId,
                    MaterialName = p.Material.Name
                })
                .FirstOrDefaultAsync();
        }

        public async Task<ProductItem> CreateAsync(ProductItemCreateModel model)
        {
            var productItem = new ProductItem
            {
                Id = Guid.NewGuid(),
                SKU = model.SKU,
                Image = model.Image,
                Price = model.Price,
                ProductId = model.ProductId,
                SizeId = model.SizeId,
                ColorId = model.ColorId,
                MaterialId = model.MaterialId
            };

            _context.ProductItems.Add(productItem);
            await _context.SaveChangesAsync();
            return productItem;
        }

        public async Task<bool> UpdateAsync(ProductItemUpdateModel model)
        {
            var existingProductItem = await _context.ProductItems.FindAsync(model.Id);
            if (existingProductItem == null) return false;

            existingProductItem.SKU = model.SKU;
            existingProductItem.Image = model.Image;
            existingProductItem.Price = model.Price;
            existingProductItem.ProductId = model.ProductId;
            existingProductItem.SizeId = model.SizeId;
            existingProductItem.ColorId = model.ColorId;
            existingProductItem.MaterialId = model.MaterialId;

            await _context.SaveChangesAsync();
            return true;
        }


        public async Task<bool> DeleteAsync(Guid id)
        {
            var productItem = await _context.ProductItems.FindAsync(id);
            if (productItem == null) return false;

            _context.ProductItems.Remove(productItem);
            await _context.SaveChangesAsync();
            return true;
        }
    }
}
