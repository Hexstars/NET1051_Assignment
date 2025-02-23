using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Services.Models.Account.Responses
{
    public class LoginResponseModel
    {
        public string Id { get; set; }
        public string UserName { get; set; }
        public string Token { get; set; }
        public List<string> Roles { get; set; }
    }
}
