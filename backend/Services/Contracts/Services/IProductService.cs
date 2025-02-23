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

        //Task<(IEnumerable<ProductViewModel> products, int totalCount)>
        //    GetProductsAsync(int currentPage, int pageSize);
        Task<(IEnumerable<ProductViewModel> products, int totalCount)>
<<<<<<< HEAD
        GetProductsAsync(int currentPage, int pageSize, bool? isActive = null);
=======
            GetProductsAsync(int currentPage, int pageSize);
        Task<IEnumerable<Product>> SearchProductsByNameAsync(string name);
>>>>>>> 1fdac32 (Tìm kiếm sản phẩm theo tên (backend , frontend))
    }
}
