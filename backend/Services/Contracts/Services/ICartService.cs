using Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Services.Contracts.Services
{
    public interface ICartService
    {
        Task CreateCart(ApplicationUser user);
        Task<IEnumerable<Cart>> GetAllCartsAsync();
        Task<Cart> GetCartByIdAsync(Guid id);
        Task AddCartAsync(Cart category);
        Task UpdateCartAsync(Cart category);
        Task DeleteCartAsync(Guid id);
        Task<bool> CartExistsAsync(Guid id);
    }
}
