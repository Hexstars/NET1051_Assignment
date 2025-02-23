using Domain.Entities;
using Services.Models.Cart;

namespace Services.Contracts.Repositories
{
    public interface IOrderRepository
    {
        Task CreateOrder(Order order);
        Task AddIntoDetail(List<CartViewModel> products, Guid orderId);
    }
}
