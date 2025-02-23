using Domain.Entities;
using Services.Contracts.Repositories.Base;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Services.Contracts.Repositories
{
    public interface IBrandRepository : IGeneralRepository<Brand, Guid>
    {
        Task<(IEnumerable<Brand> brands, int totalCount)> GetActiveBrands(int currentPage, int pageSize, bool? isActive = null);
        Task<List<Brand>> GetBrands();
        Task<Brand> GetBrandById(Guid id);
        Task AddBrand(Brand Brand);
        Task UpdateBrand(Brand Brand);
        Task DeleteBrand(Guid id);
        bool BrandExists(Guid id);
    }

}
