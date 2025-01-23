using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Entities
{
    public class CartDetail : BaseEntity
    {
        [Key]
        public int Id { get; set; }
        public decimal UnitPrice { get; set; }
        public int Quantity { get; set; }
        public decimal TotalPrice => UnitPrice * Quantity;


        public int ProductId { get; set; }
        public Product? Product { get; set; }
        public string ProductName => Product.Name;


        public int CartId { get; set; }
        public Cart? Cart { get; set; }
    }
}
