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
    public class MaterialRepository : GeneralRepository<Material, Guid>, IMaterialRepository
    {
        public MaterialRepository(ApplicationDbContext context) : base(context) { }

        // Lấy tất cả các danh mục
        public async Task<List<Material>> GetMaterials()
        {
            return await _context.Materials.ToListAsync();
        }

        // Lấy danh mục theo ID
        public async Task<Material> GetMaterialById(Guid id)
        {
            return await _context.Materials.FindAsync(id);
        }

        // Thêm danh mục mới
        public async Task AddMaterial(Material material)
        {
            material.CreatedDate = DateTime.UtcNow; // Gán ngày tạo
            material.CreatedBy = "Admin"; // Có thể thay thế bằng tên người tạo từ token nếu cần
            material.UpdatedBy = "Admin"; // Có thể thay thế bằng tên người tạo từ token nếu cần
            material.UpdatedDate = DateTime.UtcNow;

            _context.Materials.Add(material);
            await _context.SaveChangesAsync();
        }

        // Cập nhật danh mục
        public async Task UpdateMaterial(Material material)
        {
            var existingMaterials = await _context.Materials.FindAsync(material.Id);

            if (existingMaterials != null)
            {
                existingMaterials.Name = material.Name;
                existingMaterials.UpdatedDate = DateTime.UtcNow; // Cập nhật ngày thay đổi
                existingMaterials.UpdatedBy = "Admin"; // Cập nhật người thay đổi, có thể lấy từ người dùng thực tế
                existingMaterials.IsActive = material.IsActive;

                _context.Materials.Update(existingMaterials);
                await _context.SaveChangesAsync();
            }
        }

        // Xóa danh mục
        public async Task DeleteMaterial(Guid id)
        {
            var material = await _context.Materials.FindAsync(id);
            if (material != null)
            {
                _context.Materials.Remove(material);
                await _context.SaveChangesAsync();
            }
        }

        // Kiểm tra xem danh mục có tồn tại không
        public bool MaterialExists(Guid id)
        {
            return _context.Materials.Any(e => e.Id == id);
        }
    }
   
}
