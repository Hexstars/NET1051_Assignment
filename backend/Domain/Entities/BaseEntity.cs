using System.ComponentModel.DataAnnotations;

namespace Domain.Entities
{
    public class BaseEntity
    {
        [Key]
        public Guid Id { get; set; } = Guid.NewGuid();
        public DateTime CreatedDate { get; set; } = DateTime.Now;
        public string? CreatedBy { get; set; }
        public DateTime UpdatedDate { get; set; } = DateTime.Now;
        public string? UpdatedBy { get; set; }
        public bool IsActive { get; set; } = true;
    }
}
