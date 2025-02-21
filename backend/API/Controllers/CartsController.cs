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
    //[Authorize]
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

        [HttpGet("your-cart")]
        public async Task<IActionResult> ShowCart()
        {
            //var userId = _httpContextAccessor.HttpContext?.User.FindFirstValue(ClaimTypes.NameIdentifier);
            var userId = "d4f1f0d5-0751-43e9-650f-08dd4a641d4b";

            if (string.IsNullOrEmpty(userId))
                return Unauthorized();  // 401 nếu chưa đăng nhập
            var cartProducts = await _cartService.ShowCart(userId);

            return Ok(cartProducts);  // 200 OK
        }

        [HttpPost("addtocart")]
        public async Task<IActionResult> AddToCart([FromBody] AddToCartModel request)
        {
            //var userId = _httpContextAccessor.HttpContext?.User.FindFirstValue(ClaimTypes.NameIdentifier);
            var userId = "d4f1f0d5-0751-43e9-650f-08dd4a641d4b";

            if (string.IsNullOrEmpty(userId))
            {
                return Unauthorized();  // 401 nếu chưa đăng nhập
            }
            await _cartService.AddToCart(userId, request);

            return Ok();  //200 OK
        }

        [HttpPut("update-quantity")]
        public async Task<IActionResult> UpdateQuantity([FromBody] AddToCartModel request)
        {
            //var userId = _httpContextAccessor.HttpContext?.User.FindFirstValue(ClaimTypes.NameIdentifier).ToString(); 
            var userId = "d4f1f0d5-0751-43e9-650f-08dd4a641d4b";
            if (string.IsNullOrEmpty(userId))
            {
                return Unauthorized();  // 401 nếu chưa đăng nhập
            }
            await _cartService.UpdateQuantity(userId, request.ProductItemId, request.Quantity);

            return NoContent();
        }

        [HttpDelete("delete-from-cart/{productItemId}")]
        public async Task<IActionResult> DeleteFromCart(Guid productItemId)
        {
            //var userId = _httpContextAccessor.HttpContext?.User.FindFirstValue(ClaimTypes.NameIdentifier).ToString();
            var userId = "d4f1f0d5-0751-43e9-650f-08dd4a641d4b";
            if (string.IsNullOrEmpty(userId))
            {
                return Unauthorized();  // 401 nếu chưa đăng nhập
            }
            await _cartService.DeleteFromCart(userId, productItemId);
            return NoContent();
        }
    }
}
