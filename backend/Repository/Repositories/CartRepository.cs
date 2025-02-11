using Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Persistence;
using Repository.Repositories.Base;
using Services.Contracts.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

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
        // Lấy tất cả
        public async Task<List<Cart>> GetCarts()
        {
            return await _context.Carts.ToListAsync();
        }

        // Lấy  theo ID
        public async Task<Cart> GetCart(Guid id)
        {
            return await _context.Carts.FindAsync(id);
        }

        // Thêm mới
        public async Task AddCart(Cart Cart)
        {
            Cart.CreatedDate = DateTime.UtcNow; // Gán ngày tạo
            Cart.CreatedBy = "System"; // Có thể thay thế bằng tên người tạo từ token nếu cần
            Cart.IsActive = true; // Mặc định set là active khi mới tạo

            _context.Carts.Add(Cart);
            await _context.SaveChangesAsync();
        }

        // Cập nhật
        public async Task UpdateCart(Cart Cart)
        {
            var existingCart = await _context.Carts.FindAsync(Cart.Id);

            if (existingCart != null)
            {
                existingCart.UpdatedDate = DateTime.UtcNow; // Cập nhật ngày thay đổi
                existingCart.UpdatedBy = "System"; // Cập nhật người thay đổi, có thể lấy từ người dùng thực tế

                _context.Carts.Update(existingCart);
                await _context.SaveChangesAsync();
            }
        }

        // Xóa
        public async Task DeleteCart(Guid id)
        {
            var Cart = await _context.Carts.FindAsync(id);
            if (Cart != null)
            {
                _context.Carts.Remove(Cart);
                await _context.SaveChangesAsync();
            }
        }

        // Kiểm tra có tồn tại không
        public bool CartExists(Guid id)
        {
            return _context.Carts.Any(e => e.Id == id);
        }
    }
}
