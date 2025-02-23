using Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Persistence;
using Repository.Repositories.Base;
using Services.Contracts.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Repository.Repositories
{
    public class ColorRepository : GeneralRepository<Color, Guid>, IColorRepository
    {
        public ColorRepository(ApplicationDbContext context) : base(context) { }

        public async Task<(IEnumerable<Color> colors, int totalCount)>
        GetActiveColors(int currentPage, int pageSize, bool? isActive = null)
        {
            int pageIndex = currentPage - 1;

            // Lọc danh mục theo trạng thái nếu có giá trị isActive
            var query = _context.Colors.AsQueryable();
            if (isActive.HasValue)
            {
                query = query.Where(c => c.IsActive == isActive.Value);
            }

            // Đếm tổng số danh mục phù hợp
            int totalCount = await query.CountAsync();

            // Lấy dữ liệu cho trang hiện tại
            var colors = await query
                .Skip(pageIndex * pageSize)
                .Take(pageSize)
                .Select(c => new Color
                {
                    Id = c.Id,
                    Name = c.Name,
                    CreatedDate = c.CreatedDate,
                    IsActive = c.IsActive
                })
                .ToListAsync();

            return (colors, totalCount);
        }

        // Lấy tất cả các danh mục
        public async Task<List<Color>> GetColors()
        {
            return await _context.Colors.ToListAsync();
        }

        // Lấy danh mục theo ID
        public async Task<Color> GetColorById(Guid id)
        {
            return await _context.Colors.FindAsync(id);
        }

        // Thêm danh mục mới
        public async Task AddColor(Color Colors)
        {
            Colors.CreatedDate = DateTime.UtcNow; // Gán ngày tạo
            Colors.CreatedBy = "Admin"; // Có thể thay thế bằng tên người tạo từ token nếu cần
            Colors.UpdatedBy = "Admin"; // Có thể thay thế bằng tên người tạo từ token nếu cần
            Colors.UpdatedDate = DateTime.UtcNow;

                _context.Colors.Add(Colors);
            await _context.SaveChangesAsync();
        }

        // Cập nhật danh mục
        public async Task UpdateColor(Color Colors)
        {
            var existingColors = await _context.Colors.FindAsync(Colors.Id);

            if (existingColors != null)
            {
                    existingColors.Name = Colors.Name;
                    existingColors.UpdatedDate = DateTime.UtcNow; // Cập nhật ngày thay đổi
                    existingColors.UpdatedBy = "Admin"; // Cập nhật người thay đổi, có thể lấy từ người dùng thực tế
                    existingColors.IsActive = Colors.IsActive;

                    _context.Colors.Update(existingColors);
                await _context.SaveChangesAsync();
            }
        }

        // Xóa danh mục
        public async Task DeleteColor(Guid id)
        {
            var Colors = await _context.Colors.FindAsync(id);
            if (Colors != null)
            {
                _context.Colors.Remove(Colors);
                await _context.SaveChangesAsync();
            }
        }

        // Kiểm tra xem danh mục có tồn tại không
        public bool ColorExists(Guid id)
        {
            return _context.Colors.Any(e => e.Id == id);
        }
    }
}
