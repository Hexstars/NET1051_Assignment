﻿using System.ComponentModel.DataAnnotations;

namespace Domain.Entities
{
    public class Brand : BaseEntity<Guid>
    {
        [Required]
        public string Name { get; set; }
        public ICollection<Product> Products { get; set; } = new List<Product>();
    }
}
