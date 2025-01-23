using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Entities
{
    public enum OrderStatus
    {
        [Display(Name = "Chờ xử lý")]
        Pending = 0, // Default state

        [Display(Name = "Đang giao hàng")]
        InProgress = 1,

        [Display(Name = "Đã giao hàng")]
        Completed = 2,

        [Display(Name = "Đã hủy")]
        Cancelled = 3
    }
    public class Order
    {
        [Key]
        public int Id { get; set; }

        public int User_Id { get; set; }
        public ApplicationUser? User { get; set; }

        public DateTime OrderedDate { get; set; }

        public DateTime ReceivedDate { get; set; }
        public string Phone { get; set; }
        public string Address { get; set; }
        public OrderStatus Status { get; set; }  // Trạng thái đơn hàng (enum)
        public virtual ICollection<OrderDetail> OrderDetails { get; set; } = new List<OrderDetail>(); // Danh sách các OrderDetail
    }
}
