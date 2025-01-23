using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Entities
{
    public class ApplicationUser : IdentityUser
    {
        [Required]
        public string LastName { get; set; } = default!;
        [Required]
        public string FirstName { get; set; } = default!;
        public string Fullname => LastName + " " + FirstName;
    }
}
