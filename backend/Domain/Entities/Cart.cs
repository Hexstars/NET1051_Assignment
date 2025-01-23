using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Entities
{
    public class Cart : BaseEntity
    {
        [Key]
        public int Id { get; set; }

        public bool IsActive { get; set; }

        public int User_Id { get; set; }
        public ApplicationUser User { get; set; }
        

    }
}
