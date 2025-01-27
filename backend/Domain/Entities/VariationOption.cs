using System.ComponentModel.DataAnnotations.Schema;

namespace Domain.Entities
{
    public class VariationOption : BaseEntity
    {
        public string Value { get; set; }

        [ForeignKey("Variation")]
        public Guid VariationId { get; set; }
        public Variation Variation { get; set; }
        public ICollection<ProductConfiguration> ProductConfigurations { get; set; } = new List<ProductConfiguration>();
    }
}
