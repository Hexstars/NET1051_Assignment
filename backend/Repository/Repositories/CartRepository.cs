using Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Persistence;
using Repository.Repositories.Base;
using Services.Contracts.Repositories;

namespace Repository.Repositories
{
    public class CartRepository : GeneralRepository<Cart, Guid>, ICartRepository
    {
        public CartRepository(ApplicationDbContext context) : base(context) { }


        // Tạo giỏ hàng khi sau khi đăng kí
        public async Task CreateCart(ApplicationUser user)
        {
            var cart = new Cart
            {
                UserId = user.Id
            };


            _context.Carts.Add(cart);
            await _context.SaveChangesAsync();
        }

        public async Task AddToCart(string userId, Guid productId, int quantity)
        {
            var cart = await GetCartByUserID(userId);

            // Kiểm tra nếu giỏ hàng đã có sản phẩm này chưa
            var existingCartDetail = _context.CartItems
                .FirstOrDefault(cd => cd.CartId == cart.Id && cd.ProductItemId == productId);

            if (existingCartDetail != null)
            {
                // Nếu có rồi, tăng số lượng của sản phẩm trong giỏ hàng
                existingCartDetail.Quantity += 1;
                _context.CartItems.Update(existingCartDetail);
            }
            else
            {
                // Nếu chưa có, thêm sản phẩm mới vào giỏ hàng
                var cartItem = new CartItem
                {
                    CartId = cart.Id,
                    ProductItemId = productId,
                    Quantity = quantity,
                };
                _context.CartItems.Add(cartItem);
            }
            // Lưu thay đổi vào cơ sở dữ liệu
            _context.SaveChanges();
        }


        // Lấy  theo ID
        public async Task<Cart> GetCartByUserID(string id)
        {
            var cart = await _context.Carts.FirstOrDefaultAsync(c => c.UserId.ToString() == id);
            return cart;
        }
    }
}
