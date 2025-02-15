using Domain.Entities;
using Services.Contracts.Repositories.Base;
using Services.Models.Cart;
using Services.Models.Cart.Request;

namespace Services.Contracts.Repositories
{
    public interface ICartRepository : IGeneralRepository<Cart, Guid>
    {
        Task<List<CartViewModel>> ShowCart(string id);
        Task CreateCart(ApplicationUser user);
        Task AddToCart(string userId, AddToCartModel request);
        Task UpdateQuantity(string userId, Guid productId, int newQuantity);
        Task<Cart> GetCartByUserID(string id);
        Task RemoveAll(string cartId);
    }
}
