using Domain.Entities;

namespace Services.Contracts.Services
{
    public interface ICartService
    {
        Task CreateCart(ApplicationUser user);
        Task AddToCart(string userId, Guid productId, int quantity);
        Task<Cart> GetCartByUserId(string id);
    }
}
