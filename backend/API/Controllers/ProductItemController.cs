using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Services.Contracts.Services;
using Services.Models.Product;
using Services.Models.ProductItem;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductItemController : ControllerBase
    {
        private readonly IProductItemService _productService;

        public ProductItemController(IProductItemService productService)
        {
            _productService = productService;
        }
        [HttpGet]
        public async Task<IActionResult> GetProducts([FromQuery] int page = 1, [FromQuery] int pageSize = 10)
        {
            var (products, totalCount) = await _productService.GetProductsWithItemsAsync(page, pageSize);
            return Ok(new { products, totalCount });
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetProductById(Guid id)
        {
            var product = await _productService.GetProductByIdAsync(id);
            if (product == null) return NotFound();
            return Ok(product);
        }

        [HttpPost]
        public async Task<IActionResult> CreateProduct([FromBody] ProductItemCreateModel model)
        {
            var newProduct = await _productService.CreateProductItemAsync(model);
            return CreatedAtAction(nameof(GetProductById), new { id = newProduct.Id }, newProduct);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateProduct(Guid id, [FromBody] ProductItemUpdateModel model)
        {
            if (id != model.Id) return BadRequest("ID mismatch");

            var result = await _productService.UpdateProductItemAsync(model);
            if (!result) return NotFound();

            return NoContent();
        }

    }
}
