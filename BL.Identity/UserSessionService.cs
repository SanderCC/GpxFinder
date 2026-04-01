using System.Security.Claims;
using BL.Core.Attributes;
using Domain.Identity;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;

namespace BL.Identity;

[Service]
public class UserSessionService(IHttpContextAccessor httpContextAccessor, UserManager<AppUser> userManager)
    : IUserSessionService
{
    public Guid? GetUserId()
    {
        var claim = httpContextAccessor.HttpContext?.User.FindFirstValue(ClaimTypes.NameIdentifier);
        return Guid.TryParse(claim, out var id) ? id : null;
    }

    public async Task<AppUser?> GetUser()
    {
        var user = httpContextAccessor.HttpContext?.User;
        if (user?.Identity?.IsAuthenticated != true)
            return null;

        return await userManager.GetUserAsync(user);
    }

    public bool IsAuthenticated()
    {
        return httpContextAccessor.HttpContext?.User.Identity?.IsAuthenticated == true;
    }

    public bool IsAnonymous()
    {
        return !IsAuthenticated();
    }
}
