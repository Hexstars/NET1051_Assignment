using Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Services.Contracts.Repositories;
using Services.Contracts.Services;
using Services.Models.Product;

namespace Services.Services
{
    public class CategoryService : ICategoryService
    {
        private readonly ICategoryRepository _categoryRepository;

        public CategoryService(ICategoryRepository categoryRepository)
        {
            _categoryRepository = categoryRepository;
        }

        public async Task<(IEnumerable<Category> categories, int totalCount)> GetActiveCategories(int currentPage, int pageSize, bool? isActive = null)
        {
            return await _categoryRepository.GetActiveCategories(currentPage, pageSize, isActive);
        }

        // Lấy tất cả các danh mục
        public async Task<(List<Category> categories, int TotalCount)> GetCategories(int currentPage, int pageSize)
        {
            return await _categoryRepository.GetCategories(currentPage, pageSize);
        }

        // Lấy danh mục theo ID
        public async Task<Category> GetCategoryByIdAsync(Guid id)
        {
            return await _categoryRepository.GetById(id);
        }

        // Thêm danh mục mới
        public async Task AddCategoryAsync(Category category)
        {
            // Có thể thêm logic trước khi gọi repository
            await _categoryRepository.AddCategory(category);
        }

        // Cập nhật danh mục
        public async Task UpdateCategoryAsync(Category category)
        {
            var existingCategory = await _categoryRepository.GetById(category.Id);

            if (existingCategory != null)
            {
                existingCategory.Name = category.Name;
                existingCategory.IsActive = category.IsActive;
                // Cập nhật các trường khác, nếu cần
                await _categoryRepository.UpdateCategory(existingCategory);
            }
        }

        // Xóa danh mục
        public async Task DeleteCategoryAsync(Guid id)
        {
            var category = await _categoryRepository.GetById(id);
            if (category != null)
            {
                await _categoryRepository.DeleteCategory(id);
            }
        }

        // Kiểm tra danh mục có tồn tại không
        public async Task<bool> CategoryExistsAsync(Guid id)
        {
            return _categoryRepository.CategoryExists(id);
        }
    }
}
