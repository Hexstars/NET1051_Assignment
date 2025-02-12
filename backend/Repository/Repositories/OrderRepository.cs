using Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Persistence;
using Repository.Repositories.Base;
using Services.Contracts.Repositories;
using Services.Contracts.Services;
using Services.Models.Cart;

namespace Repository.Repositories
{
    public class OrderRepository : GeneralRepository<Cart, Guid>, IOrderRepository
    {
        private readonly ICartService _cartService;

        public OrderRepository(ApplicationDbContext context, ICartService cartService) : base(context)
        {
            _cartService = cartService;
        }

        public async Task CreateOrder(Order order)
        {
            _context.Add(order);
            await _context.SaveChangesAsync();
        }
        public async Task<List<CartViewModel>> GetAllProduct(Guid id)
        {
            // Lấy danh sách ProductId từ CartItems và Products
            List<CartViewModel> products = await (from cd in _context.CartItems
                                                  join p in _context.ProductItems on cd.ProductItemId equals p.Id
                                                  where cd.CartId == id
                                                  select new CartViewModel
                                                  {
                                                      ProductId = p.Id,
                                                      Quantity = cd.Quantity,
                                                      UnitPrice = p.Price,
                                                  }).ToListAsync(); // Chỉ lấy ProductId trực tiếp
            return products;
        }
        public async Task AddIntoDetail(List<CartViewModel> products, Guid orderId)
        {
            foreach (var item in products)
            {
                OrderItem detail = new OrderItem
                {
                    OrderId = orderId,
                    ProductItemId = item.ProductId,
                    Quantity = item.Quantity,
                    TotalPrice = item.UnitPrice,
                };

                _context.OrderItems.Add(detail);
            }

            // Save changes to the database
            await _context.SaveChangesAsync();
        }
    }
}
