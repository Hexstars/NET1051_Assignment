using Domain.Entities;
using Services.Contracts.Repositories;
using Services.Contracts.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Policy;
using System.Text;
using System.Threading.Tasks;

namespace Services.Services
{
    public class SizeService : ISizeService
    {
        private readonly ISizeRepository _sizeRepository;

        public SizeService(ISizeRepository sizeRepository)
        {
            _sizeRepository = sizeRepository;
        }

        // Lấy tất cả các danh mục
        public async Task<IEnumerable<Size>> GetAllSizesAsync() => await _sizeRepository.GetSizes();

        // Lấy danh mục theo ID
        public async Task<Size> GetSizeByIdAsync(Guid id)
        {
            return await _sizeRepository.GetById(id);
        }

        // Thêm danh mục mới
        public async Task AddSizeAsync(Size size)
        {
            // Có thể thêm logic trước khi gọi repository
            await _sizeRepository.AddSize(size);
        }

        // Cập nhật danh mục
        public async Task UpdateSizeAsync(Size size)
        {
            var existingSize = await _sizeRepository.GetSizeById(size.Id);

            if (existingSize != null)
            {
                existingSize.Name = size.Name;
                existingSize.IsActive = size.IsActive;
                // Cập nhật các trường khác, nếu cần
                await _sizeRepository.UpdateSize(existingSize);
            }
        }

        // Xóa danh mục
        public async Task DeleteSizeAsync(Guid id)
        {
            var size = await _sizeRepository.GetById(id);
            if (size != null)
            {
                await _sizeRepository.DeleteSize(id);
            }
        }

        // Kiểm tra danh mục có tồn tại không
        public async Task<bool> SizeExistsAsync(Guid id)
        {
            return _sizeRepository.SizeExists(id);
        }
    }
    
}
