using Microsoft.AspNetCore.Identity;
using System.ComponentModel.DataAnnotations;

namespace Domain.Entities
{
    public class ApplicationUser : IdentityUser<string>
    {
        [Required]
        public string LastName { get; set; } = default!;
        [Required]
        public string FirstName { get; set; } = default!;
        public string Fullname => LastName + " " + FirstName;
    }
}
