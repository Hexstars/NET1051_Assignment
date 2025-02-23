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
    public class CategoriesController : ControllerBase
    {
        private readonly ICategoryService _categoryService;

        public CategoriesController(ICategoryService categoryService)
        {
            _categoryService = categoryService;
        }

        [HttpGet]
        public async Task<IActionResult> GetActiveCategories([FromQuery] int currentPage = 1, [FromQuery] int pageSize = 10, [FromQuery]    bool? IsActive = null)
        {
            var (categories, totalCount) = await _categoryService.GetActiveCategories(currentPage, pageSize, IsActive);
            return Ok(new { categories, totalCount });
        }

        // GET: api/category
        //[HttpGet]
        //public async Task<ActionResult<IEnumerable<Category>>> GetCategories(int currentPage = 1)
        //{
        //    int pageSize = 10; // categories per page

        //    var (categories, totalCount) = await _categoryService.GetCategories(currentPage, pageSize);

        //    int totalPages = (int)Math.Ceiling((double)totalCount / pageSize);

        //    // API response
        //    var response = new
        //    {
        //        CurrentPage = currentPage,
        //        PageSize = pageSize,
        //        TotalPages = totalPages,
        //        TotalCount = totalCount,
        //        Categories = categories
        //    };

        //    return Ok(response);
        //}

        // GET: api/categories/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Category>> GetCategory(Guid id)
        {
            var category = await _categoryService.GetCategoryByIdAsync(id);
            if (category == null)
            {
                return NotFound(new { message = "Category not found." });
            }

            return Ok(category);
        }

        // POST: api/categories
        [HttpPost]
        public async Task<ActionResult<Category>> AddCategory([FromBody] Category category)
        {
            if (category == null)
            {
                return BadRequest(new { message = "Category data is required." });
            }

            await _categoryService.AddCategoryAsync(category);

            // Trả về ID của danh mục vừa tạo
            return CreatedAtAction(nameof(GetCategory), new { id = category.Id }, category);
        }

        // PUT: api/categories/5
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateCategory(Guid id, [FromBody] Category category)
        {
            if (category == null || category.Id != id)
            {
                return BadRequest(new { message = "Category ID mismatch." });
            }

            var existingCategory = await _categoryService.GetCategoryByIdAsync(id);
            if (existingCategory == null)
            {
                return NotFound(new { message = "Category not found." });
            }

            await _categoryService.UpdateCategoryAsync(category);

            return NoContent(); // Success, no content to return
        }

        // DELETE: api/categories/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteCategory(Guid id)
        {
            var category = await _categoryService.GetCategoryByIdAsync(id);
            if (category == null)
            {
                return NotFound(new { message = "Category not found." });
            }

            await _categoryService.DeleteCategoryAsync(id);
            return NoContent(); // Success, no content to return
        }

        // Kiểm tra danh mục có tồn tại
        [HttpGet("exists/{id}")]
        public async Task<IActionResult> CategoryExists(Guid id)
        {
            var exists = await _categoryService.CategoryExistsAsync(id);
            if (exists)
            {
                return Ok(new { message = "Category exists." });
            }

            return NotFound(new { message = "Category not found." });
        }
    }
}
