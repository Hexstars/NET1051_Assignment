using Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Services.Contracts.Services
{
    public interface ICategoryService
    {
        Task<(IEnumerable<Category> categories, int totalCount)> GetActiveCategories(int currentPage, int pageSize, bool? isActive = null);
        Task<(List<Category> categories, int TotalCount)> GetCategories(int currentPage, int pageSize);
        Task<Category> GetCategoryByIdAsync(Guid id);
        Task AddCategoryAsync(Category category);
        Task UpdateCategoryAsync(Category category);
        Task DeleteCategoryAsync(Guid id);
        Task<bool> CategoryExistsAsync(Guid id);
    }
}
