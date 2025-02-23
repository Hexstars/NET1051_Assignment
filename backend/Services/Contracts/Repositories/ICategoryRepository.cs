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
        Task<(IEnumerable<Category> categories, int totalCount)> GetActiveCategories(int currentPage, int pageSize, bool? isActive = null);
        Task<(List<Category> categories, int TotalCount)> GetCategories(int currentPage, int pageSize);
        Task<Category> GetCategory(Guid id);
        Task AddCategory(Category category);
        Task UpdateCategory(Category category);
        Task DeleteCategory(Guid id);
        bool CategoryExists(Guid id);
    }
}
