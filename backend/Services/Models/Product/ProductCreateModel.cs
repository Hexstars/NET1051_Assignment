using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Services.Models.Product
{
    public class ProductCreateModel
    {
        public string Name { get; set; } = string.Empty;
        public decimal Price { get; set; }
        public string? Description { get; set; }
        public string? Image { get; set; }
        public Guid BrandId { get; set; }
        public Guid CategoryId { get; set; }
    }

}
