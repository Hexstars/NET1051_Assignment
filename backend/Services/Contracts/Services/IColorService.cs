using Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Services.Contracts.Services
{
    public interface IColorService
    {
        Task<(IEnumerable<Color> colors, int totalCount)> GetActiveColors(int currentPage, int pageSize, bool? isActive = null);
        Task<IEnumerable<Color>> GetAllColorsAsync();
        Task<Color> GetColorByIdAsync(Guid id);
        Task AddColorAsync(Color Color);
        Task UpdateColorAsync(Color Color);
        Task DeleteColorAsync(Guid id);
        Task<bool> ColorExistsAsync(Guid id);
    }
}
