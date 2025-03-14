﻿using Domain.Entities;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using Services.Contracts.Services;
using Services.Models.Account;
using Services.Models.Account.Responses;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AccountController : ControllerBase
    {
        private readonly IAccountService _accountService;
        private readonly IConfiguration _configuration;
        private readonly IHttpContextAccessor _httpContextAccessor;
        private readonly UserManager<ApplicationUser> _userManager;

        public AccountController(IAccountService accountService, IConfiguration configuration, UserManager<ApplicationUser> userManager)
        {
            _accountService = accountService;
            _configuration = configuration;
            _userManager = userManager;
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginModel request)
        {
            if (ModelState.IsValid)
            {
                // This doesn't count login failures towards account lockout
                // To enable password failures to trigger account lockout, set lockoutOnFailure: true
                var result = await _accountService.Login(request);
                if (result != null)
                {
                    var userRoles = await _userManager.GetRolesAsync(result); // Get assigned roles
                    var authClaims = new List<Claim>
                    {
                        new Claim(ClaimTypes.NameIdentifier, result.Id.ToString()),
                        new Claim(ClaimTypes.Sid, result.Id.ToString()),
                        new Claim(ClaimTypes.Name, result.UserName!),
                    };

                    // Add roles to claims
                    foreach (var role in userRoles)
                    {
                        authClaims.Add(new Claim(ClaimTypes.Role, role));
                    }

                    var token = GenerateJwtToken(authClaims);
                    var loginInfo = new LoginResponseModel
                    {
                        Id = result.Id.ToString(),
                        UserName = result.UserName!,
                        Token = token,
                        Roles = userRoles.ToList()
                    };
                    return Ok(loginInfo);
                }
                else
                {
                    return Unauthorized(new { message = "Login failed" });
                }
            }
            return Unauthorized(new { message = "Login failed" });
        }
        private string GenerateJwtToken(List<Claim> claims)
        {
            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["Jwt:Secret"] ?? ""));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);
            var token = new JwtSecurityToken(
                claims: claims,
                expires: DateTime.UtcNow.AddHours(3),
                signingCredentials: creds
            );

            return new JwtSecurityTokenHandler().WriteToken(token);
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
                return Ok();
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
