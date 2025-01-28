using Domain.Entities;
using Services.Models.Account;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.VisualStudio.Web.CodeGenerators.Mvc.Templates.BlazorIdentity.Pages;
using Microsoft.AspNetCore.WebUtilities;
using System.Text;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AccountController : ControllerBase
    {
        private readonly SignInManager<ApplicationUser> _signInManager;
        private readonly UserManager<ApplicationUser> _userManager;

        public AccountController(SignInManager<ApplicationUser> signInManager, UserManager<ApplicationUser> userManager)
        {
            _signInManager = signInManager;
            _userManager = userManager;
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginModel request)
        {
            if (ModelState.IsValid)
            {
                // This doesn't count login failures towards account lockout
                // To enable password failures to trigger account lockout, set lockoutOnFailure: true
                var result = await _signInManager.PasswordSignInAsync(request.Username, request.Password, request.RememberMe, lockoutOnFailure: false);
                if (result.Succeeded)
                {
                    return Ok(new { message = "Login successful" });
                }
                //if (result.RequiresTwoFactor)
                //{
                //    return RedirectToPage("./LoginWith2fa", new {RememberMe = Remember });
                //}
                //if (result.IsLockedOut)
                //{
                //    _logger.LogWarning("User account locked out.");
                //    return RedirectToPage("./Lockout");
                //}
                else
                {
                    return BadRequest(new { message = "Login failed" });
                }
            }
            return BadRequest();
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] RegisterModel request)
        {
            if (ModelState.IsValid)
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

                var emailExists = await _userManager.FindByEmailAsync(user.Email);
                var usernameExists = await _userManager.FindByNameAsync(request.Username);

                if (usernameExists != null)
                {
                    return BadRequest(new { message = "Username already taken" });
                }

                var result = await _userManager.CreateAsync(user, request.Password);

                if (result.Succeeded)
                {

                    var userId = await _userManager.GetUserIdAsync(user);
                    var code = await _userManager.GenerateEmailConfirmationTokenAsync(user);
                    code = WebEncoders.Base64UrlEncode(Encoding.UTF8.GetBytes(code));
                    var callbackUrl = Url.Page(
                        "/Account/ConfirmEmail",
                    pageHandler: null,
                        values: new { area = "Identity", userId = userId, code = code },
                        protocol: Request.Scheme);

                    //await _emailSender.SendEmailAsync(email, "Confirm your email",
                    //    $"Please confirm your account by <a href='{HtmlEncoder.Default.Encode(callbackUrl)}'>clicking here</a>.");

                    //if (_userManager.Options.SignIn.RequireConfirmedAccount)
                    //{
                    //    //return RedirectToPage("RegisterConfirmation", new { email = email});
                    //    return RedirectToAction("Login");

                    //}

                    await _signInManager.SignInAsync(user, isPersistent: false);
                    return Ok(new { message = "Registration successful" });
                }
                foreach (var error in result.Errors)
                {
                    ModelState.AddModelError(string.Empty, error.Description);
                }
            }

            return BadRequest(new { message = "Registration failed" });
        }
    }
}
