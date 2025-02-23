using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Domain.Entities;
using Persistence;
using Services.Contracts.Services;
using Services.Services;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BrandsController : ControllerBase
    {
        private readonly IBrandService _brandService;

        public BrandsController(IBrandService BrandService)
        {
            _brandService = BrandService;
        }

        [HttpGet]
        public async Task<IActionResult> GetActiveBrands([FromQuery] int currentPage = 1, [FromQuery] int pageSize = 10, [FromQuery] bool? IsActive = null)
        {
            var (brands, totalCount) = await _brandService.GetActiveBrands(currentPage, pageSize, IsActive);
            return Ok(new { brands, totalCount });
        }

        //// GET: api/Brand
        //[HttpGet]
        //public async Task<ActionResult<IEnumerable<Brand>>> GetBrands()
        //{
        //    var categories = await _brandService.GetAllBrandsAsync();
        //    return Ok(categories);
        //}

        // GET: api/categories/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Brand>> GetBrandById(Guid id)
        {
            var Brand = await _brandService.GetBrandByIdAsync(id);
            if (Brand == null)
            {
                return NotFound(new { message = "Brand not found." });
            }

            return Ok(Brand);
        }

        // POST: api/categories
        [HttpPost]
        public async Task<ActionResult<Brand>> AddBrand([FromBody] Brand Brand)
        {
            if (Brand == null)
            {
                return BadRequest(new { message = "Brand data is required." });
            }

            await _brandService.AddBrandAsync(Brand);

            // Trả về ID của danh mục vừa tạo
            return CreatedAtAction(nameof(GetBrandById), new { id = Brand.Id }, Brand);
        }

        // PUT: api/categories/5
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateBrand(Guid id, [FromBody] Brand Brand)
        {
            if (Brand == null || Brand.Id != id)
            {
                return BadRequest(new { message = "Brand ID mismatch." });
            }

            var existingBrand = await _brandService.GetBrandByIdAsync(id);
            if (existingBrand == null)
            {
                return NotFound(new { message = "Brand not found." });
            }

            await _brandService.UpdateBrandAsync(Brand);

            return NoContent(); // Success, no content to return
        }

        // DELETE: api/categories/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteBrand(Guid id)
        {
            var Brand = await _brandService.GetBrandByIdAsync(id);
            if (Brand == null)
            {
                return NotFound(new { message = "Brand not found." });
            }

            await _brandService.DeleteBrandAsync(id);
            return NoContent(); // Success, no content to return
        }

        // Kiểm tra danh mục có tồn tại
        [HttpGet("exists/{id}")]
        public async Task<IActionResult> BrandExists(Guid id)
        {
            var exists = await _brandService.BrandExistsAsync(id);
            if (exists)
            {
                return Ok(new { message = "Brand exists." });
            }

            return NotFound(new { message = "Brand not found." });
        }
    }
}
