using System.ComponentModel.DataAnnotations.Schema;

namespace Domain.Entities
{
    public class ProductItem: BaseEntity<Guid>
    {
        public string SKU { get; set; }
        public string? Image { get; set; }

        public decimal Price { get; set; }

        [ForeignKey("Product")]
        public Guid ProductId { get; set; }
        public Product Product { get; set; }

        public ICollection<ProductConfiguration> 
            ProductConfigurations { get; set; } = new List<ProductConfiguration>();
        public ICollection<OrderItem> OrderItems { get; set; } = new List<OrderItem>();
    }
}
