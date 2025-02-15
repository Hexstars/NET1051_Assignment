using Azure.Core;
using Domain.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http.Extensions;
using Microsoft.AspNetCore.Mvc;
using Services.Contracts.Services;
using Services.Models.Cart;
using Services.Models.Cart.Request;
using System.Security.Claims;

namespace API.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class CartsController : ControllerBase
    {
        private readonly ICartService _cartService;
        private readonly IHttpContextAccessor _httpContextAccessor;

        public CartsController(ICartService cartService, IHttpContextAccessor httpContextAccessor)
        {
            _cartService = cartService;
            _httpContextAccessor = httpContextAccessor;
        }

        [HttpGet]
        public async Task<List<CartViewModel>> ShowCart()
        {
            var userId = _httpContextAccessor.HttpContext?.User.FindFirstValue(ClaimTypes.NameIdentifier).ToString();
            var cartProducts = await _cartService.ShowCart(userId);
            return cartProducts;
        }

        [HttpPost("addtocart")]
        public async Task AddToCart([FromBody] AddToCartModel request)
        {
            var userId = _httpContextAccessor.HttpContext?.User.FindFirstValue(ClaimTypes.NameIdentifier).ToString();
            await _cartService.AddToCart(userId, request);
        }

        [HttpGet("updatequantity")]
        public async Task UpdateQuantity([FromBody] AddToCartModel request)
        {
            var userId = _httpContextAccessor.HttpContext?.User.FindFirstValue(ClaimTypes.NameIdentifier).ToString();
            await _cartService.UpdateQuantity(userId, request.ProductItemId, request.Quantity);
        }
    }
}
