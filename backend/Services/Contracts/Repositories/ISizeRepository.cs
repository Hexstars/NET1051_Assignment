using Services.Contracts.Repositories.Base;
using Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Services.Contracts.Repositories
{
    public interface ISizeRepository : IGeneralRepository<Size, Guid>
    {
        Task<List<Size>> GetSizes();
        Task<Size> GetSizeById(Guid id);
        Task AddSize(Size size);
        Task UpdateSize(Size size);
        Task DeleteSize(Guid id);
        bool SizeExists(Guid id);
    }
}
