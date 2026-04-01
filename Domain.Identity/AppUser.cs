using Microsoft.AspNetCore.Identity;

namespace Domain.Identity;

public sealed class AppUser : IdentityUser<Guid>
{
    public string FirstName { get; set; } = null!;
    public string LastName { get; set; } = null!;
    public string? HomeTown {get; set;}
}