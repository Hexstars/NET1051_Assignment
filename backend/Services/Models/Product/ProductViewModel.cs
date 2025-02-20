namespace Services.Models.Product
{
    public class ProductViewModel
    {
        public Guid ProductId { get; set; }
        public string ProductName { get; set; }
        public string Description { get; set; }
        public string ProductImage { get; set; }
        public decimal? BasePrice { get; set; }
        public Guid BrandId { get; set; }  
        public Guid CategoryId { get; set; } 
        public List<ProductItemModel> ProductItems { get; set; }
    }

    public class ProductItemModel
    {
        public Guid ProductItemId { get; set; }
        public string SKU { get; set; }
        public decimal Price { get; set; }
        public string Image { get; set; }
        public string Color { get; set; }
        public string Size { get; set; }
        public string Material { get; set; }
    }

}
