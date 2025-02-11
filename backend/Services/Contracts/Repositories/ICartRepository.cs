using Domain.Entities;
using Services.Contracts.Repositories.Base;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Services.Contracts.Repositories
{
    public interface ICartRepository : IGeneralRepository<Cart, Guid>
    {
        Task CreateCart(ApplicationUser user);
        Task<List<Cart>> GetCarts();
        Task<Cart> GetCart(Guid id);
        Task AddCart(Cart category);
        Task UpdateCart(Cart category);
        Task DeleteCart(Guid id);
        bool CartExists(Guid id);
    }
}
