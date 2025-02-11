using Domain.Entities;
using Services.Contracts.Repositories;
using Services.Contracts.Services;

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
            // Có thể thêm logic trước khi gọi repository
            await _cartRepository.CreateCart(user);
        }

        // Lấy tất cả
        public async Task<IEnumerable<Cart>> GetAllCartsAsync()
        {
            return await _cartRepository.GetCarts();
        }

        // Lấy theo ID
        public async Task<Cart> GetCartByIdAsync(Guid id)
        {
            return await _cartRepository.GetById(id);
        }

        // Thêm
        public async Task AddCartAsync(Cart Cart)
        {
            // Có thể thêm logic trước khi gọi repository
            await _cartRepository.AddCart(Cart);
        }

        // Cập nhật
        public async Task UpdateCartAsync(Cart Cart)
        {
            var existingCart = await _cartRepository.GetById(Cart.Id);

            if (existingCart != null)
            {
                // Cập nhật các trường khác, nếu cần
                await _cartRepository.UpdateCart(existingCart);
            }
        }

        // Xóa
        public async Task DeleteCartAsync(Guid id)
        {
            var Cart = await _cartRepository.GetById(id);
            if (Cart != null)
            {
                await _cartRepository.DeleteCart(id);
            }
        }

        // Kiểm tra có tồn tại không
        public async Task<bool> CartExistsAsync(Guid id)
        {
            return _cartRepository.CartExists(id);
        }
    }
}
