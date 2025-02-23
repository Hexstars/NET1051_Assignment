using Domain.Entities;

namespace Services.Models.Product
{
    public class ProductUpdateModel : BaseEntity<Guid>
    {

        public Guid Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public decimal Price { get; set; }
        public string Image { get; set; } = string.Empty;
        public Guid CategoryId { get; set; }
        public Guid BrandId { get; set; }
    }
}
