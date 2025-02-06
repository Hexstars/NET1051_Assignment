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

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CategoriesController : ControllerBase
    {
        private readonly ICategoryService _categoryService;

        public CategoriesController(ICategoryService categoryService)
        {
            _categoryService = categoryService;
        }

        // GET: api/category
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Category>>> GetCategories()
        {
            var categories = await _categoryService.GetCategories();
            return Ok(categories);
        }

        // GET: api/category/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Category>> GetCategory(Guid id)
        {
            var category = await _categoryService.GetCategory(id);
            if (category == null)
            {
                return NotFound();
            }

            return Ok(category);
        }

        // POST: api/category
        [HttpPost]
        public async Task<ActionResult<Category>> AddCategory([FromBody] Category category)
        {
            if (category == null)
            {
                return BadRequest("Category data is required.");
            }

            await _categoryService.AddCategory(category);

            // Trả về ID của danh mục vừa tạo
            return CreatedAtAction(nameof(GetCategory), new { id = category.Id }, category);
        }

        // PUT: api/category/5
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateCategory(Guid id, [FromBody] Category category)
        {
            if (category == null || category.Id != id)
            {
                return BadRequest("Category ID mismatch.");
            }

            var existingCategory = await _categoryService.GetCategory(id);
            if (existingCategory == null)
            {
                return NotFound();
            }

            await _categoryService.UpdateCategory(category);

            return NoContent(); // Success, no content to return
        }

        // DELETE: api/category/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteCategory(Guid id)
        {
            var category = await _categoryService.GetCategory(id);
            if (category == null)
            {
                return NotFound();
            }

            await _categoryService.DeleteCategory(id);
            return NoContent(); // Success, no content to return
        }

        // Kiểm tra danh mục có tồn tại
        [HttpGet("exists/{id}")]
        public IActionResult CategoryExists(Guid id)
        {
            var exists = _categoryService.CategoryExists(id);
            if (exists)
            {
                return Ok(new { message = "Category exists." });
            }

            return NotFound(new { message = "Category not found." });
        }
    }
}
