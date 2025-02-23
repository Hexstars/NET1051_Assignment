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
        public async Task AddIntoDetail(List<CartViewModel> products, Guid orderId)
        {
            foreach (var item in products)
            {
                OrderItem detail = new OrderItem
                {
                    OrderId = orderId,
                    ProductItemId = item.ProductItemId,
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
