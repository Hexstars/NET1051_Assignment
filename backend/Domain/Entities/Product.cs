using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Domain.Entities
{
    public class Product : BaseEntity<Guid>
    {
        [Required]
        public string Name { get; set; }
        public decimal Price { get; set; }
        public string? Description { get; set; }
        public string? Image { get; set; }
        public DateTime? CreatedDate { get; set; }
        public DateTime? UpdatedDate { get; set; }

        [ForeignKey("Brand")]
        public Guid BrandId { get; set; }
        public Brand Brand { get; set; }

        [ForeignKey("Category")]
        public Guid CategoryId { get; set; }
        public Category Category { get; set; }

        public ICollection<ProductItem> ProductItems { get; set; } = new List<ProductItem>();
    }
}
