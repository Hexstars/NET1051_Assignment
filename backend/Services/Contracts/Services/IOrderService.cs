using Domain.Entities;
using Services.Models.Cart;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Services.Contracts.Services
{
    public interface IOrderService
    {
        Task CreateOrder(Order order);
        Task AddIntoDetail(List<CartViewModel> products ,Guid orderId);
        Task<List<CartViewModel>> GetAllProduct(Guid id);
    }
}
