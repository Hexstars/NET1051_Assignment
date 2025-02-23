using Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Persistence;
using Repository.Repositories.Base;
using Services.Contracts.Repositories;

namespace Repository.Repositories
{
    public class SizeRepository : GeneralRepository<Size, Guid>, ISizeRepository
    {
        public SizeRepository(ApplicationDbContext context) : base(context) { }

        public async Task<(IEnumerable<Size> sizes, int totalCount)>
        GetActiveSizes(int currentPage, int pageSize, bool? isActive = null)
        {
            int pageIndex = currentPage - 1;

            // Lọc danh mục theo trạng thái nếu có giá trị isActive
            var query = _context.Sizes.AsQueryable();
            if (isActive.HasValue)
            {
                query = query.Where(c => c.IsActive == isActive.Value);
            }

            // Đếm tổng số danh mục phù hợp
            int totalCount = await query.CountAsync();

            // Lấy dữ liệu cho trang hiện tại
            var sizes = await query
                .Skip(pageIndex * pageSize)
                .Take(pageSize)
                .Select(c => new Size
                {
                    Id = c.Id,
                    Name = c.Name,
                    CreatedDate = c.CreatedDate,
                    IsActive = c.IsActive
                })
                .ToListAsync();

            return (sizes, totalCount);
        }

        // Lấy tất cả các danh mục
        public async Task<List<Size>> GetSizes()
        {
            return await _context.Sizes.ToListAsync();
        }

        // Lấy danh mục theo ID
        public async Task<Size> GetSizeById(Guid id)
        {
            return await _context.Sizes.FindAsync(id);
        }

        // Thêm danh mục mới
        public async Task AddSize(Size sizes)
        {
            sizes.CreatedDate = DateTime.UtcNow; // Gán ngày tạo
            sizes.CreatedBy = "Admin"; // Có thể thay thế bằng tên người tạo từ token nếu cần
            sizes.UpdatedBy = "Admin"; // Có thể thay thế bằng tên người tạo từ token nếu cần
            sizes.UpdatedDate = DateTime.UtcNow;

            _context.Sizes.Add(sizes);
            await _context.SaveChangesAsync();
        }

        // Cập nhật danh mục
        public async Task UpdateSize(Size sizes)
        {
            var existingSizes = await _context.Sizes.FindAsync(sizes.Id);

            if (existingSizes != null)
            {
                existingSizes.Name = sizes.Name;
                existingSizes.UpdatedDate = DateTime.UtcNow; // Cập nhật ngày thay đổi
                existingSizes.UpdatedBy = "Admin"; // Cập nhật người thay đổi, có thể lấy từ người dùng thực tế
                existingSizes.IsActive = sizes.IsActive;

                _context.Sizes.Update(existingSizes);
                await _context.SaveChangesAsync();
            }
        }

        // Xóa danh mục
        public async Task DeleteSize(Guid id)
        {
            var sizes = await _context.Sizes.FindAsync(id);
            if (sizes != null)
            {
                _context.Sizes.Remove(sizes);
                await _context.SaveChangesAsync();
            }
        }

        // Kiểm tra xem danh mục có tồn tại không
        public bool SizeExists(Guid id)
        {
            return _context.Sizes.Any(e => e.Id == id);
        }
    }
}
