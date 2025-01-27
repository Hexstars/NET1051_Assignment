using Domain.Enums;
using System.ComponentModel.DataAnnotations.Schema;

namespace Domain.Entities
{
    public class Order : BaseEntity
    {
        public decimal Total { get; set; }
        [ForeignKey("ApplicationUser")]
        public Guid UserId { get; set; }
        public ApplicationUser User { get; set; }
        public OrderStatus Status { get; set; }
    }
}
