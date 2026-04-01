using BL.Core.Attributes;
using BL.Identity;

namespace BL.API.RequestHandlers.Profile;

[Handler]
public sealed class GetProfileHandler(IUserSessionService userSession)
{
    public async Task<Response?> HandleAsync()
    {
        var user = await userSession.GetUser();
        if (user is null) return null;

        return new Response(user.FirstName, user.LastName, user.Email!, user.HomeTown);
    }

    public sealed record Response(
        string FirstName,
        string LastName,
        string Email,
        string? Hometown);
}
