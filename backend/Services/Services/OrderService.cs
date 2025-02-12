using Domain.Entities;
using Services.Contracts.Repositories;
using Services.Contracts.Services;
using Services.Models.Cart;

namespace Services.Services
{
    public class OrderService : IOrderService
    {
        private readonly IOrderRepository _orderRepository;

        public OrderService(IOrderRepository orderRepository)
        {
            _orderRepository = orderRepository;
        }

        public async Task CreateOrder(Order order)
        {
            await _orderRepository.CreateOrder(order);
        }
        public async Task AddIntoDetail(List<CartViewModel> products, Guid orderId)
        {
            await _orderRepository.AddIntoDetail(products, orderId);
        }
        public async Task<List<CartViewModel>> GetAllProduct(Guid id)
        {
            var products = await _orderRepository.GetAllProduct(id);
            return products;
        }
    }
}
