using System.ComponentModel.DataAnnotations.Schema;

namespace Domain.Entities
{
    public class ProductItem: BaseEntity<Guid>
    {
        public string? SKU { get; set; }
        public string? Image { get; set; }

        public decimal Price { get; set; }

        [ForeignKey("Product")]
        public Guid ProductId { get; set; }
        public Product Product { get; set; }

        [ForeignKey("Size")]
        public Guid SizeId { get; set; }
        public Size? Size { get; set; }

        [ForeignKey("Color")]
        public Guid ColorId { get; set; }
        public Color? Color { get; set; }
        
        [ForeignKey("Material")]
        public Guid MaterialId { get; set; }
        public Material? Material { get; set; }
        public ICollection<OrderItem> OrderItems { get; set; } = new List<OrderItem>();
    }
}
