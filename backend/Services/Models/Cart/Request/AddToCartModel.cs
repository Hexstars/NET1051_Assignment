namespace Services.Models.Cart.Request
{
    public class AddToCartModel
    {
        public Guid ProductItemId { get; set; }
        public int Quantity { get; set; }
    }
}
