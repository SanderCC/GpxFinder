using Domain.Identity;

namespace BL.Identity;

public interface IUserSessionService
{
    Guid? GetUserId();
    Task<AppUser?> GetUser();
    bool IsAuthenticated();
    bool IsAnonymous();
}
