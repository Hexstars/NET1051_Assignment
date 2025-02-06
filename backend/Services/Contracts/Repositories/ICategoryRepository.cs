using Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Services.Contracts.Repositories.Base;

namespace Services.Contracts.Repositories
{
    public interface ICategoryRepository : IGeneralRepository<Category, Guid>
    {
        Task<List<Category>> GetCategories();
        Task<Category> GetCategory(Guid id);
        Task AddCategory(Category category);
        Task UpdateCategory(Category category);
        Task DeleteCategory(Guid id);
        bool CategoryExists(Guid id);
    }
}
