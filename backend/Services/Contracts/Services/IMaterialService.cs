using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Domain.Entities;

namespace Services.Contracts.Services
{
    public interface IMaterialService
    {
         Task<IEnumerable<Material>> GetAllMaterialsAsync();
        Task<Material> GetMaterialByIdAsync(Guid id);
        Task AddMaterialAsync(Material category);
        Task UpdateMaterialAsync(Material category);
        Task DeleteMaterialAsync(Guid id);
        Task<bool> MaterialExistsAsync(Guid id);
    }
}
