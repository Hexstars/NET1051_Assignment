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
        Task<List<Category>> GetCategories();
        Task<Category> GetCategory(Guid id);
        Task AddCategory(Category category);
        Task UpdateCategory(Category category);
        Task DeleteCategory(Guid id);
        bool CategoryExists(Guid id);
    }
}
