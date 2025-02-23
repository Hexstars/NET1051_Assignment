using Domain.Entities;
using Services.Models.Product;
using Services.Models.ProductItem;

namespace Services.Contracts.Services
{
    public interface IProductItemService
    {
        Task<(IEnumerable<ProductItemViewModel> products, int totalCount)>
            GetProductsWithItemsAsync(int currentPage, int pageSize);
        Task<ProductItemViewModel?> GetProductByIdAsync(Guid id);
        Task<ProductItem> CreateProductItemAsync(ProductItemCreateModel model);
        Task<bool> UpdateProductItemAsync(ProductItemUpdateModel model);
    }
}
