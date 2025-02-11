using Microsoft.EntityFrameworkCore;
using Persistence;
using Repository.Repositories.Base;
using Services.Contracts.Repositories;
using Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Repository.Repositories
{
    public class SizeRepository : GeneralRepository<Size, Guid>, ISizeRepository
    {
        public SizeRepository(ApplicationDbContext context) : base(context) { }

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
            sizes.CreatedBy = "System"; // Có thể thay thế bằng tên người tạo từ token nếu cần
            sizes.IsActive = true; // Mặc định set là active khi mới tạo

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
                existingSizes.UpdatedBy = "System"; // Cập nhật người thay đổi, có thể lấy từ người dùng thực tế

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
