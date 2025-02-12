using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Services.Models.Cart
{
    public class CartViewModel
    {
        public Guid ProductId { get; set; }

        public string Image { get; set; }

        public string ProductName { get; set; }

        public decimal UnitPrice { get; set; }

        public int Quantity { get; set; }

        public decimal Total => UnitPrice * Quantity; // Tổng giá
    }
}
