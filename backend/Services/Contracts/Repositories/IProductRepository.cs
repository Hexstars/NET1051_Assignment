using Domain.Entities;
using Services.Contracts.Repositories.Base;
using Services.Models.Product;
using Services.Models.ProductItem;

namespace Services.Contracts.Repositories
{
    public interface IProductRepository : IGeneralRepository<Product, Guid>
    {
        Task<(IEnumerable<ProductViewModel> products, int TotalCount)>
        GetProductsWithItems(int currentPage, int pageSize, bool? isActive = null);

        //Task<(IEnumerable<ProductViewModel> products, int TotalCount)>
        //    GetProductsWithItems(int currentPage, int pageSize);
        Task<ProductViewModel?> GetProductById(Guid id);
        Task<Product> CreateProduct(ProductCreateModel model);
        Task<bool> UpdateProduct(ProductUpdateModel model);
        Task<bool> DeleteProduct(Guid productId);
        Task<IEnumerable<Product>> SearchProductsByNameAsync(string name);
    }
}
