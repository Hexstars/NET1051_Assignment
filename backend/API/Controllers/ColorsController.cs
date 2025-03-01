﻿using System;
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
    public class ColorsController : ControllerBase
    {
        private readonly IColorService _colorService;

        public ColorsController(IColorService ColorService)
        {
            _colorService = ColorService;
        }

        // GET: api/Color
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Color>>> GetColors()
        {
            var categories = await _colorService.GetAllColorsAsync();
            return Ok(categories);
        }

        // GET: api/categories/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Color>> GetColorById(Guid id)
        {
            var Color = await _colorService.GetColorByIdAsync(id);
            if (Color == null)
            {
                return NotFound(new { message = "Color not found." });
            }

            return Ok(Color);
        }

        // POST: api/categories
        [HttpPost]
        public async Task<ActionResult<Color>> AddColor([FromBody] Color Color)
        {
            if (Color == null)
            {
                return BadRequest(new { message = "Color data is required." });
            }

            await _colorService.AddColorAsync(Color);

            // Trả về ID của danh mục vừa tạo
            return CreatedAtAction(nameof(GetColors), new { id = Color.Id }, Color);
        }

        // PUT: api/categories/5
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateColor(Guid id, [FromBody] Color Color)
        {
            if (Color == null || Color.Id != id)
            {
                return BadRequest(new { message = "Color ID mismatch." });
            }

            var existingColor = await _colorService.GetColorByIdAsync(id);
            if (existingColor == null)
            {
                return NotFound(new { message = "Color not found." });
            }

            await _colorService.UpdateColorAsync(Color);

            return NoContent(); // Success, no content to return
        }

        // DELETE: api/categories/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteColor(Guid id)
        {
            var Color = await _colorService.GetColorByIdAsync(id);
            if (Color == null)
            {
                return NotFound(new { message = "Color not found." });
            }

            await _colorService.DeleteColorAsync(id);
            return NoContent(); // Success, no content to return
        }

        // Kiểm tra danh mục có tồn tại
        [HttpGet("exists/{id}")]
        public async Task<IActionResult> ColorExists(Guid id)
        {
            var exists = await _colorService.ColorExistsAsync(id);
            if (exists)
            {
                return Ok(new { message = "Color exists." });
            }

            return NotFound(new { message = "Color not found." });
        }
    }
}
