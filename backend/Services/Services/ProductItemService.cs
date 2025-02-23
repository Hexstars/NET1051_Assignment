using Domain.Entities;
using Services.Contracts.Repositories;
using Services.Contracts.Services;
using Services.Models.Product;
using Services.Models.ProductItem;

namespace Services.Services
{
    public class ProductItemService : IProductItemService
    {
        private readonly IProductitemRepository _productItem;

        public ProductItemService(IProductitemRepository productItem)
        {
            _productItem = productItem;
        }


        public async Task<(IEnumerable<ProductItemViewModel> products, int totalCount)>
            GetProductsWithItemsAsync(int currentPage, int pageSize)
        {
            return await _productItem.GetProductsWithItems(currentPage, pageSize);
        }

        public async Task<ProductItemViewModel?> GetProductByIdAsync(Guid id)
        {
            return await _productItem.GetByIdAsync(id);
        }

        public async Task<ProductItem> CreateProductItemAsync(ProductItemCreateModel model)
        {
            return await _productItem.CreateAsync(model);
        }

        public async Task<bool> UpdateProductItemAsync(ProductItemUpdateModel model)
        {
            return await _productItem.UpdateAsync(model);
        }


    }

}
