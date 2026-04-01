using BL.Core.Attributes;
using BL.Identity;
using DAL.Core;
using Domain.App;
using Microsoft.EntityFrameworkCore;

namespace BL.API.RequestHandlers.Favorites;

[Handler]
public sealed class AddFavoriteHandler(Db db, IUserSessionService userSession)
{
    public async Task<bool> HandleAsync(Guid trailId)
    {
        var userId = userSession.GetUserId()
                     ?? throw new UnauthorizedAccessException();

        var exists = await db.UserFavorites
            .AnyAsync(f => f.UserId == userId && f.TrailId == trailId);

        if (exists) return false;

        db.UserFavorites.Add(new UserFavorite
        {
            UserId = userId,
            TrailId = trailId,
            CreatedAt = DateTime.UtcNow,
        });

        await db.SaveChangesAsync();
        return true;
    }
}
