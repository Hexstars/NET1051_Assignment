using Domain.Entities;
using Services.Contracts.Repositories;
using Services.Contracts.Repositories.Base;
using Services.Contracts.Services;
using Services.Models.Product;

namespace Services.Services
{
    public class ProductService : IProductService
    {
        private readonly IProductRepository _productRepository;
        private readonly IUnitOfWork _unitOfWork;

        public ProductService(IProductRepository productRepository, IUnitOfWork unitOfWork)
        {
            _productRepository = productRepository;
            _unitOfWork = unitOfWork;
        }

        public async Task<(IEnumerable<ProductViewModel> products, int totalCount)>
        GetProductsAsync(int currentPage, int pageSize, bool? isActive = null)
        {
            return await _productRepository.GetProductsWithItems(currentPage, pageSize, isActive);
        }

        //public async Task<(IEnumerable<ProductViewModel> products, int totalCount)>
        //    GetProductsAsync(int currentPage, int pageSize)
        //{
        //    return await _productRepository.GetProductsWithItems(currentPage, pageSize);
        //}

        public async Task<ProductViewModel?> GetProductByIdAsync(Guid id)
        {
            return await _productRepository.GetProductById(id);
        }

        //Lấy sản phẩm theo brand id
        public async Task<IEnumerable<ProductViewModel>> GetProductsByBrandAsync(Guid? brandId)
        {
            return await _productRepository.GetProductsByBrandAsync(brandId);
        }

        public async Task<Product> CreateProductAsync(ProductCreateModel model)
        {
            try
            {
                // Tạo mới Product từ ProductCreateModel
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
                    IsActive = true
                };
                await _productRepository.CreateAsync(product);
                await _unitOfWork.SaveChangesAsync();
                return product;
            }
            catch (Exception)
            {
                throw;
            }
        }

        public async Task<bool> UpdateProductAsync(ProductUpdateModel model)
        {
            if (model == null)
                throw new ArgumentNullException(nameof(model), "Product update data is required");

            // Lấy sản phẩm hiện có từ repository (ProductForViewModel)
            var existingProduct = await _productRepository.GetProductById(model.Id);
            if (existingProduct == null) return false;

            // Tạo đối tượng ProductUpdateModel để gửi vào repo update
            var productToUpdate = new ProductUpdateModel
            {
                Id = model.Id,
                Name = model.Name,
                Description = model.Description,
                Price = model.Price,
                Image = model.Image,
                CategoryId = model.CategoryId,
                BrandId = model.BrandId,
                UpdatedDate = DateTime.UtcNow,
                IsActive = model.IsActive
            };

            // Gọi repository để cập nhật sản phẩm
            await _productRepository.UpdateProduct(productToUpdate);

            // Lưu thay đổi vào database
            await _unitOfWork.SaveChangesAsync();

            // Trả về true nếu có ít nhất một bản ghi được thay đổi
            return true;
        }


        public async Task<bool> DeleteProductAsync(Guid productId)
        {
            return await _productRepository.DeleteProduct(productId);
        }
    }
}
