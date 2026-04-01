using BL.Core.Attributes;
using Domain.Identity;
using Microsoft.AspNetCore.Identity;

namespace BL.API.RequestHandlers.Identity;

[Handler]
public sealed class RegisterHandler(UserManager<AppUser> userManager)
{
    public async Task<Response> HandleAsync(Request model)
    {
        var user = new AppUser
        {
            Id = Guid.CreateVersion7(),
            UserName = model.Email,
            Email = model.Email,
            FirstName = model.FirstName,
            LastName = model.LastName,
            HomeTown = model.Hometown,
        };

        var result = await userManager.CreateAsync(user, model.Password);

        return new Response(
            result.Succeeded,
            result.Errors.Select(e => e.Description).ToArray());
    }

    public sealed record Request(
        string FirstName,
        string LastName,
        string Email,
        string Password,
        string? Hometown);
    public sealed record Response(
        bool Succeeded,
        string[] Errors);
}
