using System.ComponentModel.DataAnnotations;

namespace Domain.Entities
{
    public class Color : BaseEntity<Guid>
    {
        [Required]
        public string Name { get; set; }
        public ICollection<ProductItem> ProductItems { get; set; } = new List<ProductItem>();
    }
}
