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
using Microsoft.AspNetCore.Authorization;

namespace API.Controllers
{
    [Authorize(Roles = "Admin")]
    [Route("api/[controller]")]
    [ApiController]
    public class SizesController : ControllerBase
    {
        private readonly ISizeService _sizeService;

        public SizesController(ISizeService sizeService)
        {
            _sizeService = sizeService;
        }

        // GET: api/Size
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Size>>> GetSizes()
        {
            var categories = await _sizeService.GetAllSizesAsync();
            return Ok(categories);
        }

        // GET: api/categories/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Size>> GetSizeById(Guid id)
        {
            var Size = await _sizeService.GetSizeByIdAsync(id);
            if (Size == null)
            {
                return NotFound(new { message = "Size not found." });
            }

            return Ok(Size);
        }

        // POST: api/categories
        [HttpPost]
        public async Task<ActionResult<Size>> AddSize([FromBody] Size Size)
        {
            if (Size == null)
            {
                return BadRequest(new { message = "Size data is required." });
            }

            await _sizeService.AddSizeAsync(Size);

            // Trả về ID của danh mục vừa tạo
            return CreatedAtAction(nameof(GetSizes), new { id = Size.Id }, Size);
        }

        // PUT: api/categories/5
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateSize(Guid id, [FromBody] Size Size)
        {
            if (Size == null || Size.Id != id)
            {
                return BadRequest(new { message = "Size ID mismatch." });
            }

            var existingSize = await _sizeService.GetSizeByIdAsync(id);
            if (existingSize == null)
            {
                return NotFound(new { message = "Size not found." });
            }

            await _sizeService.UpdateSizeAsync(Size);

            return NoContent(); // Success, no content to return
        }

        // DELETE: api/categories/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteSize(Guid id)
        {
            var Size = await _sizeService.GetSizeByIdAsync(id);
            if (Size == null)
            {
                return NotFound(new { message = "Size not found." });
            }

            await _sizeService.DeleteSizeAsync(id);
            return NoContent(); // Success, no content to return
        }

        // Kiểm tra danh mục có tồn tại
        [HttpGet("exists/{id}")]
        public async Task<IActionResult> SizeExists(Guid id)
        {
            var exists = await _sizeService.SizeExistsAsync(id);
            if (exists)
            {
                return Ok(new { message = "Size exists." });
            }

            return NotFound(new { message = "Size not found." });
        }
    }
}
