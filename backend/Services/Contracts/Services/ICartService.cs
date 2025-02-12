using Domain.Entities;
using Services.Models.Cart.Request;

namespace Services.Contracts.Services
{
    public interface ICartService
    {
        Task CreateCart(ApplicationUser user);
        Task AddToCart(string userId, AddToCartModel request);
        Task<Cart> GetCartByUserId(string id);
    }
}
