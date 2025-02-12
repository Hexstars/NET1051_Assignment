using Domain.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Services.Contracts.Services;
using System.Security.Claims;

namespace API.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class OrdersController : ControllerBase
    {
        private readonly IHttpContextAccessor _httpContextAccessor;
        private readonly IAccountService _accountService;
        private readonly IOrderService _orderService;
        private readonly ICartService _cartService;

        public OrdersController(IHttpContextAccessor httpContextAccessor, IAccountService accountService, IOrderService orderService, ICartService cartService)
        {
            _httpContextAccessor = httpContextAccessor;
            _accountService = accountService;
            _orderService = orderService;
            _cartService = cartService;
        }
        [HttpGet("create-order")]
        public async Task CreateOrder()
        {
            string userId = _httpContextAccessor.HttpContext?.User.FindFirstValue(ClaimTypes.NameIdentifier).ToString();
            var user = await _accountService.GetUserDetails(userId);
            Order order = new Order
            {
                UserId = user.Id,
                CreatedDate = DateTime.Now,
                CreatedBy = user.Id.ToString(),
                Phone = "123456789",
                Address = "HCM City",
                Status = 0,
            };
            await _orderService.CreateOrder(order);

            Cart cart = await _cartService.GetCartByUserId(userId);

            var products = await _orderService.GetAllProduct(cart.Id);
            if (products.Any())
            {
                // Add products to the order details
                await _orderService.AddIntoDetail(products, order.Id);

                // Clear the cart after adding items to the order
                await _cartService.RemoveAll(cart.Id.ToString());
            }
        }
    }
}
