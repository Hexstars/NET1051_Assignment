﻿namespace Services.Models.ProductItem
{
    public class ProductItemUpdateModel
    {
        public Guid Id { get; set; }
        public string? SKU { get; set; }
        public string? Image { get; set; }
        public decimal Price { get; set; }
        public Guid ProductId { get; set; }
        public Guid SizeId { get; set; }
        public Guid ColorId { get; set; }
        public Guid MaterialId { get; set; }
    }
}
