using Domain.Entities;
using Services.Models.Cart;
using Services.Models.Cart.Request;

namespace Services.Contracts.Services
{
    public interface ICartService
    {
        Task<List<CartViewModel>> ShowCart(string id);
        Task CreateCart(ApplicationUser user);
        Task AddToCart(string userId, AddToCartModel request);
        Task UpdateQuantity(string userId, Guid productId, int newQuantity);
        Task<Cart> GetCartByUserId(string id);
        Task DeleteFromCart(string userId, Guid productItemId);
        Task RemoveAll(string cartId);
    }
}
