using BL.Core.Attributes;
using BL.Identity;
using DAL.Core;
using Microsoft.EntityFrameworkCore;

namespace BL.API.RequestHandlers.Favorites;

[Handler]
public sealed class RemoveFavoriteHandler(
    Db db,
    IUserSessionService userSession)
{
    public async Task<bool> HandleAsync(Guid trailId)
    {
        var userId = userSession.GetUserId()
                     ?? throw new UnauthorizedAccessException();

        var favorite = await db.UserFavorites
            .FirstOrDefaultAsync(f => f.UserId == userId && f.TrailId == trailId);

        if (favorite is null) return false;

        db.UserFavorites.Remove(favorite);
        await db.SaveChangesAsync();
        return true;
    }
}
