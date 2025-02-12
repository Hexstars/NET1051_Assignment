using Domain.Enums;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Domain.Entities
{
    public class Order : BaseEntity<Guid>
    {
        public decimal Total { get; set; }
        [ForeignKey("ApplicationUser")]
        public Guid UserId { get; set; }
        public ApplicationUser User { get; set; }

        [DisplayFormat(DataFormatString = "{0:dd/MM/yyyy HH:mm:ss}")]
        public DateTime OrderDate = DateTime.Now;

        [StringLength(15)]
        public string Phone { get; set; }


        [StringLength(100)]
        public string Address { get; set; }

        public OrderStatus Status { get; set; }

        public ICollection<OrderItem> OrderItems { get; set; } = new List<OrderItem>();
    }
}
