using Domain.Entities;
using Services.Models.Product;

namespace Services.Contracts.Services
{
    public interface IProductService
    {
        Task<bool> DeleteProductAsync(Guid productId);
        Task<bool> UpdateProductAsync(ProductUpdateModel model);
        Task<Product> CreateProductAsync(ProductCreateModel model);
        Task<ProductViewModel?> GetProductByIdAsync(Guid id);

        Task<(IEnumerable<ProductViewModel> products, int totalCount)>
            GetProductsAsync(int currentPage, int pageSize);
    }
}
