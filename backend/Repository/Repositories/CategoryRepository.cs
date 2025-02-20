using Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Persistence;
using Repository.Repositories.Base;
using Services.Contracts.Repositories;

namespace Repository.Repositories
{
    public class CategoryRepository : GeneralRepository<Category, Guid>, ICategoryRepository
    {
        public CategoryRepository(ApplicationDbContext context) : base(context) { }

        // Lấy tất cả các danh mục
        public async Task<(List<Category> categories, int TotalCount)> GetCategories(int currentPage, int pageSize)
        {
            int pageIndex = currentPage - 1;

            // Đếm tổng số sản phẩm để tính số trang
            int totalCount = await _context.Categories.CountAsync();

            // Lấy dữ liệu cho trang hiện tại
            List<Category> list = await _context.Categories
                                        .Skip(pageIndex * pageSize)
                                        .Take(pageSize)
                                        .ToListAsync();

            return (list, totalCount);
        }

        // Lấy danh mục theo ID
        public async Task<Category> GetCategory(Guid id)
        {
            return await _context.Categories.FindAsync(id);
        }

        // Thêm danh mục mới
        public async Task AddCategory(Category category)
        {
            category.CreatedDate = DateTime.UtcNow; // Gán ngày tạo
            category.CreatedBy = "System"; // Có thể thay thế bằng tên người tạo từ token nếu cần
            category.IsActive = true; // Mặc định set là active khi mới tạo

            _context.Categories.Add(category);
            await _context.SaveChangesAsync();
        }

        // Cập nhật danh mục
        public async Task UpdateCategory(Category category)
        {
            var existingCategory = await _context.Categories.FindAsync(category.Id);

            if (existingCategory != null)
            {
                existingCategory.Name = category.Name;
                existingCategory.UpdatedDate = DateTime.UtcNow; // Cập nhật ngày thay đổi
                existingCategory.UpdatedBy = "System"; // Cập nhật người thay đổi, có thể lấy từ người dùng thực tế

                _context.Categories.Update(existingCategory);
                await _context.SaveChangesAsync();
            }
        }

        // Xóa danh mục
        public async Task DeleteCategory(Guid id)
        {
            var category = await _context.Categories.FindAsync(id);
            if (category != null)
            {
                _context.Categories.Remove(category);
                await _context.SaveChangesAsync();
            }
        }

        // Kiểm tra xem danh mục có tồn tại không
        public bool CategoryExists(Guid id)
        {
            return _context.Categories.Any(e => e.Id == id);
        }
    }
}
