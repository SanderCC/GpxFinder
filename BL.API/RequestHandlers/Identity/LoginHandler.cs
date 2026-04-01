using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using BL.Core.Attributes;
using Domain.Identity;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;

namespace BL.API.RequestHandlers.Identity;

[Handler]
public sealed class LoginHandler(
    UserManager<AppUser> userManager,
    SignInManager<AppUser> signInManager,
    IConfiguration configuration)
{
    public async Task<Response> HandleAsync(Request model)
    {
        var user = await userManager.FindByEmailAsync(model.Username) 
                   ?? await userManager.FindByNameAsync(model.Username);

        if (user == null)
        {
            return new Response("", ["Invalid username or password"]);
        }

        var result = await signInManager.CheckPasswordSignInAsync(user, model.Password, false);

        if (!result.Succeeded)
        {
            return new Response("", ["Invalid username or password"]);
        }

        var token = GenerateJwtToken(user);
        return new Response(token, []);
    }

    private string GenerateJwtToken(AppUser user)
    {
        var claims = new List<Claim>
        {
            new(ClaimTypes.NameIdentifier, user.Id.ToString()),
            new(ClaimTypes.Name, user.UserName!),
            new(ClaimTypes.Email, user.Email!),
            new(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
        };

        var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(configuration["Jwt:Secret"]!));
        var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);
        var expires = DateTime.Now.AddDays(Convert.ToDouble(7));

        var token = new JwtSecurityToken(
            configuration["Jwt:Issuer"],
            configuration["Jwt:Audience"],
            claims,
            expires: expires,
            signingCredentials: creds
        );

        return new JwtSecurityTokenHandler().WriteToken(token);
    }
    
    public sealed record Request(
        string Username,
        string Password);
    public sealed record Response(
        string Token,
        string[] Errors);
}