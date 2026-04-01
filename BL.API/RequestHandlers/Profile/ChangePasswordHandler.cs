using BL.Core.Attributes;
using BL.Identity;
using Domain.Identity;
using Microsoft.AspNetCore.Identity;

namespace BL.API.RequestHandlers.Profile;

[Handler]
public sealed class ChangePasswordHandler(
    IUserSessionService userSession,
    UserManager<AppUser> userManager)
{
    public async Task<Response> HandleAsync(Request model)
    {
        var user = await userSession.GetUser()
                   ?? throw new UnauthorizedAccessException();

        var result = await userManager.ChangePasswordAsync(user, model.CurrentPassword, model.NewPassword);

        return new Response(result.Succeeded, result.Errors.Select(e => e.Description).ToArray());
    }

    public sealed record Request(
        string CurrentPassword,
        string NewPassword);
    public sealed record Response(
        bool Succeeded,
        string[] Errors);
}
