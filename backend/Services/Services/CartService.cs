using Domain.Entities;
using Services.Contracts.Repositories;
using Services.Contracts.Services;
using Services.Models.Cart.Request;

namespace Services.Services
{
    public class CartService : ICartService
    {
        private readonly ICartRepository _cartRepository;

        public CartService(ICartRepository cartRepository)
        {
            _cartRepository = cartRepository;
        }

        // Tạo giỏ hàng sau khi đăng ký
        public async Task CreateCart(ApplicationUser user)
        {
            await _cartRepository.CreateCart(user);
        }
        public async Task AddToCart(string userId, AddToCartModel request)
        {
            await _cartRepository.AddToCart(userId, request);
        }
        public async Task<Cart> GetCartByUserId(string id)
        {
            var cart = await _cartRepository.GetCartByUserID(id);
            return cart;
        }
        public async Task RemoveAll(string cartId)
        {
            await _cartRepository.RemoveAll(cartId);
        }
    }
}
