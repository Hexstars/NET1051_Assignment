using Domain.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Services.Contracts.Services;
using Services.Models.Product;
using Services.Services;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductController : ControllerBase
    {
        private readonly IProductService _productService;

        public ProductController(IProductService productService)
        {
            _productService = productService;
        }

        [HttpGet]
        public async Task<IActionResult> GetProducts([FromQuery] int currentPage = 1, [FromQuery] int pageSize = 20, [FromQuery] bool? IsActive = null)
        {
            var (products, totalCount) = await _productService.GetProductsAsync(currentPage, pageSize, IsActive);
            return Ok(new { products, totalCount });
        }
            
        [HttpGet("{id}")]
        public async Task<IActionResult> GetProductById(Guid id)
        {
            var product = await _productService.GetProductByIdAsync(id);
            if (product == null)
                return NotFound("Sản phẩm không tồn tại.");
            return Ok(product);
        }

        //Lấy danh sách sản phẩm theo Brand Id
        [HttpGet("by-brand/{brandId}")]
        public async Task<IActionResult> GetProductsByBrand(Guid brandId)
        {
            var products = await _productService.GetProductsByBrandAsync(brandId);

            if (products == null || !products.Any())
            {
                return NotFound(new { message = "Không tìm thấy sản phẩm cho thương hiệu này." });
            }

            return Ok(products);
        }

        [HttpPost]
        public async Task<IActionResult> CreateProduct([FromBody] ProductCreateModel model)
        {
            if (model == null)
                return BadRequest("Product data is required");

            var newProduct = await _productService.CreateProductAsync(model);
            return CreatedAtAction(nameof(GetProductById), new { id = newProduct.Id }, newProduct);
        }

        [Authorize(Roles = "Admin")]
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateProduct([FromRoute]Guid id, [FromBody] ProductUpdateModel product)
        {
            if (id != product.Id)
                return BadRequest("ID không khớp.");

            var updated = await _productService.UpdateProductAsync(product);
            if (!updated)
                return NotFound("Sản phẩm không tồn tại.");

            return NoContent();
        }

        /// <summary>
        /// Xóa sản phẩm (Xóa mềm).
        /// </summary>
        [Authorize(Roles = "Admin")]
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteProduct(Guid id)
        {
            var deleted = await _productService.DeleteProductAsync(id);
            if (!deleted)
                return NotFound("Sản phẩm không tồn tại.");

            return NoContent();
        }
    }
}
