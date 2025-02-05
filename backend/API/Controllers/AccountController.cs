using Microsoft.AspNetCore.Mvc;
using Services.Models.Account;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AccountController : ControllerBase
    {
        private readonly Services.Contracts.Services.IAccountService _accountService;

        public AccountController(Services.Contracts.Services.IAccountService accountService)
        {
            _accountService = accountService;
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginModel request)
        {
            if (ModelState.IsValid)
            {
                // This doesn't count login failures towards account lockout
                // To enable password failures to trigger account lockout, set lockoutOnFailure: true
                var result = await _accountService.Login(request);
                if (result)
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
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var (success, errors) = await _accountService.Register(request);

            if (success)
            {
                return Ok(new { message = "Registration successful" });
            }

            // Trả về lỗi
            return BadRequest(new { message = "Registration failed", errors });
        }

        [HttpGet("logout")]
        public async Task<IActionResult> Logout()
        {
            await _accountService.Logout();
            return Ok(new { message = "Logout successful" });
        }
    }
}
