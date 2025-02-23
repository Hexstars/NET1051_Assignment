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
        //Lấy danh sách sp theo brand id
        Task<IEnumerable<ProductViewModel>> GetProductsByBrandAsync(Guid? brandId);

        //Task<(IEnumerable<ProductViewModel> products, int totalCount)>
        //    GetProductsAsync(int currentPage, int pageSize);
        Task<(IEnumerable<ProductViewModel> products, int totalCount)>
        GetProductsAsync(int currentPage, int pageSize, bool? isActive = null);
    }
}
