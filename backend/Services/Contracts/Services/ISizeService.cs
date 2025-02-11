﻿using Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Services.Contracts.Services
{
    public interface ISizeService
    {
        Task<IEnumerable<Size>> GetAllSizesAsync();
        Task<Size> GetSizeByIdAsync(Guid id);
        Task AddSizeAsync(Size category);
        Task UpdateSizeAsync(Size category);
        Task DeleteSizeAsync(Guid id);
        Task<bool> SizeExistsAsync(Guid id);
    }
}
