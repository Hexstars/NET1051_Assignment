using Domain.Entities;
using Services.Contracts.Repositories.Base;
using Services.Models.Product;
using Services.Models.ProductItem;

namespace Services.Contracts.Repositories
{
    public interface IProductRepository : IGeneralRepository<Product, Guid>
    {
        Task<(IEnumerable<ProductViewModel> products, int TotalCount)>
            GetProductsWithItems(int currentPage, int pageSize);
        Task<ProductViewModel?> GetProductById(Guid id);
        //Lấy danh sách sản phẩm theo brand id
        Task<IEnumerable<ProductViewModel>> GetProductsByBrandAsync(Guid? brandId);
        Task<Product> CreateProduct(ProductCreateModel model);
        Task<bool> UpdateProduct(ProductUpdateModel model);
        Task<bool> DeleteProduct(Guid productId);
    }
}
