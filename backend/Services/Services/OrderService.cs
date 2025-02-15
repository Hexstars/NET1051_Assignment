using Domain.Entities;
using Services.Contracts.Repositories;
using Services.Contracts.Services;
using Services.Models.Cart;

namespace Services.Services
{
    public class OrderService : IOrderService
    {
        private readonly IOrderRepository _orderRepository;
        private readonly ICartRepository _cartRepository;

        public OrderService(IOrderRepository orderRepository, ICartRepository cartRepository)
        {
            _orderRepository = orderRepository;
            _cartRepository = cartRepository;
        }

        public async Task CreateOrder(Order order)
        {
            await _orderRepository.CreateOrder(order);
        }
        public async Task AddIntoDetail(List<CartViewModel> products, Guid orderId)
        {
            await _orderRepository.AddIntoDetail(products, orderId);
        }
        public async Task<List<CartViewModel>> GetAllProduct(string id)
        {
            var products = await _cartRepository.ShowCart(id);
            return products;
        }
    }
}
