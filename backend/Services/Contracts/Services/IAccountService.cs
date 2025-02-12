using Domain.Entities;
using Services.Models.Account;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Services.Contracts.Services
{
    public interface IAccountService
    {
        Task<ApplicationUser> GetUserDetails(string userId);
        Task<ApplicationUser> Login(LoginModel request);
        Task<(bool Success, List<string> Errors)> Register(RegisterModel request);
        Task Logout();
    }
}
