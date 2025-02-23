using Domain.Entities;
using Services.Contracts.Repositories.Base;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Services.Contracts.Repositories
{
    public interface IMaterialRepository : IGeneralRepository<Material, Guid>
    {
        Task<(IEnumerable<Material> materials, int totalCount)> GetActiveMaterials(int currentPage, int pageSize, bool? isActive = null);
        Task<List<Material>> GetMaterials();
        Task<Material> GetMaterialById(Guid id);
        Task AddMaterial(Material material);
        Task UpdateMaterial(Material material);
        Task DeleteMaterial(Guid id);
        bool MaterialExists(Guid id);
    }
    
}
