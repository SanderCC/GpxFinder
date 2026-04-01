using BL.Core.Attributes;
using BL.Identity;
using Domain.Identity;
using Microsoft.AspNetCore.Identity;

namespace BL.API.RequestHandlers.Profile;

[Handler]
public sealed class UpdateProfileHandler(
    IUserSessionService userSession,
    UserManager<AppUser> userManager)
{
    public async Task<Response> HandleAsync(Request model)
    {
        var user = await userSession.GetUser()
                   ?? throw new UnauthorizedAccessException();

        user.FirstName = model.FirstName;
        user.LastName = model.LastName;
        user.HomeTown = model.Hometown;

        var result = await userManager.UpdateAsync(user);

        return new Response(result.Succeeded, result.Errors.Select(e => e.Description).ToArray());
    }

    public sealed record Request(
        string FirstName,
        string LastName,
        string? Hometown);
    public sealed record Response(
        bool Succeeded,
        string[] Errors);
}
