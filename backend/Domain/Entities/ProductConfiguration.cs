using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Domain.Entities
{
    public class ProductConfiguration 
    {
        [Key]
        public Guid Id { get; set; } = Guid.NewGuid();
        [ForeignKey("ProductItem")]
        public Guid ProductItemId { get; set; }
        public ProductItem ProductItem { get; set; }
        
        [ForeignKey("VariationOption")]
        public Guid VariationOptionId { get; set; }
        public VariationOption VariationOption { get; set; }

    }
}
