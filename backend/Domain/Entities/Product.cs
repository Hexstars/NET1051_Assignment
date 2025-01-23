using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Entities
{
    public class Product : BaseEntity
    {
        [Key]
        public int Id { get; set; }

        [Required]
        public string Name { get; set; }

        public decimal Price { get; set; }

        public string? Description { get; set; }

        public bool IsActive { get; set; } = true;


        //Foreign key
        public required Category Category { get; set; }
        public int Category_Id { get; set; }

        public required Brand Brand { get; set; }
        public int Brand_Id { get; set; }

        public required Material Material { get; set; }
        public int Material_Id { get; set; }

        public required Size Size { get; set; }
        public int Size_Id { get; set; }
    }
}
