using Services.Contracts.Repositories;
using Services.Contracts.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Domain.Entities;
using Microsoft.AspNetCore.DataProtection.XmlEncryption;

namespace Services.Services
{
    public class MaterialService : IMaterialService
    {
        private readonly IMaterialRepository _materialRepository;

        public MaterialService(IMaterialRepository materialRepository)
        {
            _materialRepository = materialRepository;
        }

        public async Task<(IEnumerable<Material> materials, int totalCount)> GetActiveMaterials(int currentPage, int pageSize, bool? isActive = null)
        {
            return await _materialRepository.GetActiveMaterials(currentPage, pageSize, isActive);
        }

        // Lấy tất cả các danh mục
        public async Task<IEnumerable<Material>> GetAllMaterialsAsync() => await _materialRepository.GetMaterials();

        // Lấy danh mục theo ID
        public async Task<Material> GetMaterialByIdAsync(Guid id)
        {
            return await _materialRepository.GetById(id);
        }

        // Thêm danh mục mới
        public async Task AddMaterialAsync(Material Material)
        {
            // Có thể thêm logic trước khi gọi repository
            await _materialRepository.AddMaterial(Material);
        }

        // Cập nhật danh mục
        public async Task UpdateMaterialAsync(Material Material)
        {
            var existingMaterial = await _materialRepository.GetMaterialById(Material.Id);

            if (existingMaterial != null)
            {
                existingMaterial.Name = Material.Name;
                existingMaterial.IsActive = Material.IsActive;

                // Cập nhật các trường khác, nếu cần
                await _materialRepository.UpdateMaterial(existingMaterial);
            }
        }

        // Xóa danh mục
        public async Task DeleteMaterialAsync(Guid id)
        {
            var Material = await _materialRepository.GetById(id);
            if (Material != null)
            {
                await _materialRepository.DeleteMaterial(id);
            }
        }

        // Kiểm tra danh mục có tồn tại không
        public async Task<bool> MaterialExistsAsync(Guid id)
        {
            return _materialRepository.MaterialExists(id);
        }
    }
    
}
