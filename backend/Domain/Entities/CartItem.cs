using System.ComponentModel.DataAnnotations.Schema;

namespace Domain.Entities
{
    public class CartItem : BaseEntity<Guid>
    {
        public decimal UnitPrice { get; set; }
        public int Quantity { get; set; }
        public decimal TotalPrice => UnitPrice * Quantity;

        [ForeignKey("ProductItem")]
        public Guid ProductItemId { get; set; }
        public ProductItem? ProductItems { get; set; }

        [ForeignKey("Cart")]
        public Guid CartId { get; set; }
        public Cart? Cart { get; set; }
    }
}
