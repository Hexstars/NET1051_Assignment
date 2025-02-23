using Domain.Entities;
using Services.Contracts.Repositories;
using Services.Contracts.Services;

namespace Services.Services
{
    public class ColorService : IColorService
    {
        private readonly IColorRepository _colorRepository;

        public ColorService(IColorRepository ColorRepository)
        {
            _colorRepository = ColorRepository;
        }

        // Lấy tất cả các danh mục
        public async Task<IEnumerable<Color>> GetAllColorsAsync() => await _colorRepository.GetColors();

        // Lấy danh mục theo ID
        public async Task<Color> GetColorByIdAsync(Guid id)
        {
            return await _colorRepository.GetById(id);
        }

        // Thêm danh mục mới
        public async Task AddColorAsync(Color Color)
        {
            // Có thể thêm logic trước khi gọi repository
            await _colorRepository.AddColor(Color);
        }

        // Cập nhật danh mục
        public async Task UpdateColorAsync(Color Color)
        {
            var existingColor = await _colorRepository.GetColorById(Color.Id);

            if (existingColor != null)
            {
                existingColor.Name = Color.Name;
                existingColor.IsActive = Color.IsActive;
                // Cập nhật các trường khác, nếu cần
                await _colorRepository.UpdateColor(existingColor);
            }
        }

        // Xóa danh mục
        public async Task DeleteColorAsync(Guid id)
        {
            var Color = await _colorRepository.GetById(id);
            if (Color != null)
            {
                await _colorRepository.DeleteColor(id);
            }
        }

        // Kiểm tra danh mục có tồn tại không
        public async Task<bool> ColorExistsAsync(Guid id)
        {
            return _colorRepository.ColorExists(id);
        }
    }

}
