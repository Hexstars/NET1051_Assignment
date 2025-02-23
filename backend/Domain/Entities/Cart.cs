using System.ComponentModel.DataAnnotations.Schema;

namespace Domain.Entities
{
    public class Cart : BaseEntity<Guid>
    {
        [ForeignKey("ApplicationUser")]
        public Guid? UserId { get; set; }
        public ApplicationUser User { get; set; }
        public ICollection<CartItem> CartItems { get; set; } = new List<CartItem>();
    }
}
