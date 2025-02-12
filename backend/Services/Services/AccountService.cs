using Domain.Entities;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Services.Contracts.Services;
using Services.Models.Account;

namespace Services.Services
{
    public class AccountService : IAccountService
    {
        private readonly SignInManager<ApplicationUser> _signInManager;
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly ICartService _cartService;
        public AccountService(SignInManager<ApplicationUser> signInManager, UserManager<ApplicationUser> userManager, ICartService cartService)
        {
            _signInManager = signInManager;
            _userManager = userManager;
            _cartService = cartService;
        }

        public async Task<ApplicationUser> GetUserDetails(string userId)
        {
            var user = await _userManager.FindByIdAsync(userId);
            return user;
        }
        public async Task<ApplicationUser> Login(LoginModel request)
        {
            var user = await _userManager.FindByEmailAsync(request.Email);
            if (user == null) 
            {
                return null;
            }
            // This doesn't count login failures towards account lockout
            // To enable password failures to trigger account lockout, set lockoutOnFailure: true
            var result = await _signInManager.PasswordSignInAsync(user.UserName, request.Password, request.RememberMe, lockoutOnFailure: false);
            if (result.Succeeded)
            {
                return user;
            }
            return null;
        }

        public async Task<(bool Success, List<string> Errors)> Register(RegisterModel request)
        {
            var user = new ApplicationUser
            {
                UserName = request.Username,
                FullName = "",
                Email = request.Email,
                Gender = "",
                Address = "",
                //EmailConfirmed = true,
            };

            var result = await _userManager.CreateAsync(user, request.Password);
            
            if (result.Succeeded)
            {

                //var userId = await _userManager.GetUserIdAsync(user);
                //var code = await _userManager.GenerateEmailConfirmationTokenAsync(user);
                //code = WebEncoders.Base64UrlEncode(Encoding.UTF8.GetBytes(code));
                //var callbackUrl = Url.Page(
                //    "/Account/ConfirmEmail",
                //pageHandler: null,
                //    values: new { area = "Identity", userId = userId, code = code },
                //    protocol: Request.Scheme);

                //await _emailSender.SendEmailAsync(email, "Confirm your email",
                //    $"Please confirm your account by <a href='{HtmlEncoder.Default.Encode(callbackUrl)}'>clicking here</a>.");

                //if (_userManager.Options.SignIn.RequireConfirmedAccount)
                //{
                //    //return RedirectToPage("RegisterConfirmation", new { email = email});
                //    return RedirectToAction("Login");

                //}

                //await _signInManager.SignInAsync(user, isPersistent: false);
                await _cartService.CreateCart(user);
                return (true, new List<string>());
            }

            //Nếu thất bại, trả về lỗi
            var errors = result.Errors.Select(e => e.Description).ToList();
            return (false, errors);
        }
        public async Task Logout()
        {
            await _signInManager.SignOutAsync();
        }
    }
}
