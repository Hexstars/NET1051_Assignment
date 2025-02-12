using Domain.Entities;
using Services.Contracts.Repositories;
using Services.Contracts.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Services.Services
{
    public class BrandService : IBrandService
    {
        private readonly IBrandRepository _brandRepository;

        public BrandService(IBrandRepository brandRepository)
        {
            _brandRepository = brandRepository;
        }

        // Lấy tất cả các danh mục
        public async Task<IEnumerable<Brand>> GetAllBrandsAsync() => await _brandRepository.GetBrands();

        // Lấy danh mục theo ID
        public async Task<Brand> GetBrandByIdAsync(Guid id)
        {
            return await _brandRepository.GetById(id);
        }

        // Thêm danh mục mới
        public async Task AddBrandAsync(Brand Brand)
        {
            // Có thể thêm logic trước khi gọi repository
            await _brandRepository.AddBrand(Brand);
        }

        // Cập nhật danh mục
        public async Task UpdateBrandAsync(Brand Brand)
        {
            var existingCategory = await _brandRepository.GetBrandById(Brand.Id);

            if (existingCategory != null)
            {
                existingCategory.Name = Brand.Name;
                // Cập nhật các trường khác, nếu cần
                await _brandRepository.UpdateBrand(existingCategory);
            }
        }

        // Xóa danh mục
        public async Task DeleteBrandAsync(Guid id)
        {
            var Brand = await _brandRepository.GetById(id);
            if (Brand != null)
            {
                await _brandRepository.DeleteBrand(id);
            }
        }

        // Kiểm tra danh mục có tồn tại không
        public async Task<bool> BrandExistsAsync(Guid id)
        {
            return _brandRepository.BrandExists(id);
        }
    }

}
