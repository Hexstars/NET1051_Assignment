using Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Services.Contracts.Services
{
    public interface ISizeService
    {
        Task<(IEnumerable<Size> sizes, int totalCount)> GetActiveSizes(int currentPage, int pageSize, bool? isActive = null);
        Task<IEnumerable<Size>> GetAllSizesAsync();
        Task<Size> GetSizeByIdAsync(Guid id);
        Task AddSizeAsync(Size size);
        Task UpdateSizeAsync(Size size);
        Task DeleteSizeAsync(Guid id);
        Task<bool> SizeExistsAsync(Guid id);
    }
}
