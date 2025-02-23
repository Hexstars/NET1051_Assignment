using Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Services.Contracts.Services
{
    public interface IBrandService
    {
        Task<(IEnumerable<Brand> brands, int totalCount)> GetActiveBrands(int currentPage, int pageSize, bool? isActive = null);
        Task<IEnumerable<Brand>> GetAllBrandsAsync();
        Task<Brand> GetBrandByIdAsync(Guid id);
        Task AddBrandAsync(Brand Brand);
        Task UpdateBrandAsync(Brand Brand);
        Task DeleteBrandAsync(Guid id);
        Task<bool> BrandExistsAsync(Guid id);
    }
}
