﻿using Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Persistence;
using Repository.Repositories.Base;
using Services.Contracts.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Repository.Repositories
{
    public class BrandRepository : GeneralRepository<Brand, Guid>, IBrandRepository
    {
        public BrandRepository(ApplicationDbContext context) : base(context) { }

        // Lấy tất cả các danh mục
        public async Task<List<Brand>> GetBrands()
        {
            return await _context.Brands.ToListAsync();
        }

        // Lấy danh mục theo ID
        public async Task<Brand> GetBrandById(Guid id)
        {
            return await _context.Brands.FindAsync(id);
        }

        // Thêm danh mục mới
        public async Task AddBrand(Brand Brands)
        {
            Brands.CreatedDate = DateTime.UtcNow; // Gán ngày tạo
            Brands.CreatedBy = "System"; // Có thể thay thế bằng tên người tạo từ token nếu cần
            Brands.IsActive = true; // Mặc định set là active khi mới tạo

            _context.Brands.Add(Brands);
            await _context.SaveChangesAsync();
        }

        // Cập nhật danh mục
        public async Task UpdateBrand(Brand Brands)
        {
            var existingBrands = await _context.Brands.FindAsync(Brands.Id);

            if (existingBrands != null)
            {
                existingBrands.Name = Brands.Name;
                existingBrands.UpdatedDate = DateTime.UtcNow; // Cập nhật ngày thay đổi
                existingBrands.UpdatedBy = "System"; // Cập nhật người thay đổi, có thể lấy từ người dùng thực tế

                _context.Brands.Update(existingBrands);
                await _context.SaveChangesAsync();
            }
        }

        // Xóa danh mục
        public async Task DeleteBrand(Guid id)
        {
            var Brands = await _context.Brands.FindAsync(id);
            if (Brands != null)
            {
                _context.Brands.Remove(Brands);
                await _context.SaveChangesAsync();
            }
        }

        // Kiểm tra xem danh mục có tồn tại không
        public bool BrandExists(Guid id)
        {
            return _context.Brands.Any(e => e.Id == id);
        }
    }

}
