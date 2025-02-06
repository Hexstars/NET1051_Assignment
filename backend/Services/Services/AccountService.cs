﻿using Domain.Entities;
using Microsoft.AspNetCore.Identity;
using Services.Contracts.Services;
using Services.Models.Account;

namespace Services.Services
{
    public class AccountService : IAccountService
    {
        private readonly SignInManager<ApplicationUser> _signInManager;
        private readonly UserManager<ApplicationUser> _userManager;

        public AccountService(SignInManager<ApplicationUser> signInManager, UserManager<ApplicationUser> userManager)
        {
            _signInManager = signInManager;
            _userManager = userManager;
        }

        public async Task<bool> Login(LoginModel request)
        {
            var user = await _userManager.FindByEmailAsync(request.Email);
            if (user == null) 
            {
                return false;
            }
            // This doesn't count login failures towards account lockout
            // To enable password failures to trigger account lockout, set lockoutOnFailure: true
            var result = await _signInManager.PasswordSignInAsync(user.UserName, request.Password, request.RememberMe, lockoutOnFailure: false);
            if (result.Succeeded)
            {
                return true;
            }
            return false;
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
