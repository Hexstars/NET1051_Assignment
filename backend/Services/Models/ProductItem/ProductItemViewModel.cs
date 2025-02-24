namespace Services.Models.ProductItem
{
    public class ProductItemViewModel
    {
        public Guid Id { get; set; }
        public string? SKU { get; set; }
        public string? Image { get; set; }
        public decimal Price { get; set; }
        public Guid ProductId { get; set; }
        public string ProductName { get; set; }
        public Guid SizeId { get; set; }
        public string SizeName { get; set; }
        public Guid ColorId { get; set; }
        public string ColorName { get; set; }
        public Guid MaterialId { get; set; }
        public string MaterialName { get; set; }
        public bool IsActive { get; set; }
    }
}
