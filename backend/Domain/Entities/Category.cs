using System.ComponentModel.DataAnnotations;

namespace Domain.Entities
{
    public class Category : BaseEntity
    {
        [Required]
        public string Name { get; set; }
        public ICollection<Product> Products { get; set; } = new List<Product>();
    }
}
