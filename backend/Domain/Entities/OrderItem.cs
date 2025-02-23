using System.ComponentModel.DataAnnotations.Schema;

namespace Domain.Entities
{
    public class OrderItem : BaseEntity<Guid>
    {
        public int Quantity { get; set; }
        public decimal TotalPrice { get; set; }

        [ForeignKey("ProductItem")]
        public Guid ProductItemId { get; set; }
        public ProductItem ProductItem { get; set; }

        [ForeignKey("Order")]
        public Guid OrderId { get; set; }
        public Order Order { get; set; }
    }
}
