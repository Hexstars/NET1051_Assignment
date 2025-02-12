using Domain.Entities;
using Services.Contracts.Repositories.Base;
using Services.Models.Cart.Request;
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
        Task AddToCart(string userId, AddToCartModel request);
        Task<Cart> GetCartByUserID(string id);
        Task RemoveAll(string cartId);
    }
}
