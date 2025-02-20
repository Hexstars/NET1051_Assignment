using Domain.Entities;
using Services.Models.ProductItem;

namespace Services.Contracts.Repositories
{
    public interface IProductitemRepository
    {
        Task<(IEnumerable<ProductItemViewModel> Items, int TotalItems)>
      GetProductsWithItems(int currentPage, int pageSize);
        Task<ProductItemViewModel?> GetByIdAsync(Guid id);
        Task<ProductItem> CreateAsync(ProductItemCreateModel model);
        Task<bool> UpdateAsync(ProductItemUpdateModel model);
        Task<bool> DeleteAsync(Guid id);
    }
}
