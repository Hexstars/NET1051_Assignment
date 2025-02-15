using Azure.Core;
using Domain.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Persistence;
using Repository.Repositories.Base;
using Services.Contracts.Repositories;
using Services.Models.Cart;
using Services.Models.Cart.Request;

namespace Repository.Repositories
{
    public class CartRepository : GeneralRepository<Cart, Guid>, ICartRepository
    {
        public CartRepository(ApplicationDbContext context) : base(context) { }

        public async Task<List<CartViewModel>> ShowCart(string id)
        {

            //Query và tạo list chứa sản phẩm
            List<CartViewModel> cartProducts = (from cd in _context.CartItems
                                              join pi in _context.ProductItems on cd.ProductItemId equals pi.Id
                                              join p in _context.Products on pi.ProductId equals p.Id
                                                where cd.CartId.ToString() == id
                                              select new CartViewModel
                                              {
                                                  ProductItemId = pi.Id,
                                                  Image = p.Image,
                                                  ProductName = p.Name,
                                                  UnitPrice = pi.Price,
                                                  Quantity = cd.Quantity
                                              }).ToList();
            return cartProducts;
        }

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

        public async Task AddToCart(string userId, AddToCartModel request)
        {
            var cart = await GetCartByUserID(userId);

            // Kiểm tra nếu giỏ hàng đã có sản phẩm này chưa
            var existingCartDetail = _context.CartItems
                .FirstOrDefault(cd => cd.CartId == cart.Id && cd.ProductItemId == request.ProductItemId);

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
                    ProductItemId = request.ProductItemId,
                    Quantity = request.Quantity,
                    CreatedBy = userId.ToString(),
                };
                _context.CartItems.Add(cartItem);
            }
            // Lưu thay đổi vào cơ sở dữ liệu
            _context.SaveChanges();
        }
        public async Task UpdateQuantity(string userId, Guid productItemId, int newQuantity)
        {
            var cart = await GetCartByUserID(userId);

            // Find all items in the cart
            var cartProduct = _context.CartItems.FirstOrDefault(cd => cd.CartId == cart.Id && cd.ProductItemId == productItemId);

            cartProduct.Quantity = newQuantity;

            _context.Update(cartProduct);
            _context.SaveChanges();
        }
        public async Task RemoveAll(string cartId)
        {
            var cartDetails = _context.CartItems.Where(cd => cd.CartId.ToString() == cartId).ToList();

            _context.CartItems.RemoveRange(cartDetails);

            await _context.SaveChangesAsync();
        }
        // Lấy  theo ID
        public async Task<Cart> GetCartByUserID(string id)
        {
            var cart = await _context.Carts.FirstOrDefaultAsync(c => c.UserId.ToString() == id);
            return cart;
        }
    }
}
