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
    public class MaterialsController : ControllerBase
    {
        private readonly IMaterialService _materialService;

        public MaterialsController(IMaterialService materialService)
        {
            _materialService = materialService;
        }

        [HttpGet]
        public async Task<IActionResult> GetActiveMaterials([FromQuery] int currentPage = 1, [FromQuery] int pageSize = 10, [FromQuery] bool? IsActive = null)
        {
            var (materials, totalCount) = await _materialService.GetActiveMaterials(currentPage, pageSize, IsActive);
            return Ok(new { materials, totalCount });
        }

        // GET: api/Material
        //[HttpGet]
        //public async Task<ActionResult<IEnumerable<Material>>> GetMaterials()
        //{
        //    var categories = await _materialService.GetAllMaterialsAsync();
        //    return Ok(categories);
        //}

        // GET: api/categories/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Material>> GetMaterialById(Guid id)
        {
            var Material = await _materialService.GetMaterialByIdAsync(id);
            if (Material == null)
            {
                return NotFound(new { message = "Material not found." });
            }

            return Ok(Material);
        }

        // POST: api/categories
        [HttpPost]
        public async Task<ActionResult<Material>> AddMaterial([FromBody] Material Material)
        {
            if (Material == null)
            {
                return BadRequest(new { message = "Material data is required." });
            }

            await _materialService.AddMaterialAsync(Material);

            // Trả về ID của danh mục vừa tạo
            return CreatedAtAction(nameof(GetMaterialById), new { id = Material.Id }, Material);
        }

        // PUT: api/categories/5
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateMaterial(Guid id, [FromBody] Material Material)
        {
            if (Material == null || Material.Id != id)
            {
                return BadRequest(new { message = "Material ID mismatch." });
            }

            var existingMaterial = await _materialService.GetMaterialByIdAsync(id);
            if (existingMaterial == null)
            {
                return NotFound(new { message = "Material not found." });
            }

            await _materialService.UpdateMaterialAsync(Material);

            return NoContent(); // Success, no content to return
        }

        // DELETE: api/categories/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteMaterial(Guid id)
        {
            var Material = await _materialService.GetMaterialByIdAsync(id);
            if (Material == null)
            {
                return NotFound(new { message = "Material not found." });
            }

            await       _materialService.DeleteMaterialAsync(id);
            return NoContent(); // Success, no content to return
        }

        // Kiểm tra danh mục có tồn tại
        [HttpGet("exists/{id}")]
        public async Task<IActionResult> MaterialExists(Guid id)
        {
            var exists = await _materialService.MaterialExistsAsync(id);
            if (exists)
            {
                return Ok(new { message = "Material exists." });
            }

            return NotFound(new { message = "Material not found." });
        }
    }
}
