using Domain.Entities;
using Services.Contracts.Repositories.Base;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Services.Contracts.Repositories
{
    public interface IColorRepository : IGeneralRepository<Color, Guid>
    {
        Task<(IEnumerable<Color> colors, int totalCount)> GetActiveColors(int currentPage, int pageSize, bool? isActive = null);
        Task<List<Color>> GetColors();
        Task<Color> GetColorById(Guid id);
        Task AddColor(Color Color);
        Task UpdateColor(Color Color);
        Task DeleteColor(Guid id);
        bool ColorExists(Guid id);
    }

}
