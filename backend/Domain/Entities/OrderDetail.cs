using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Entities
{
    public class OrderDetail : BaseEntity
    {
        public int Id { get; set; }
        public int Quantity { get; set; }
        public decimal UnitPrice { get; set; }

        public int Order_Id { get; set; }
        public Order Order { get; set; }

        public int Product_Id { get; set; }
        public Product Product { get; set; }
    }
}
