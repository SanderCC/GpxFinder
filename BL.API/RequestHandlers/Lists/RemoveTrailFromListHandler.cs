using BL.Core.Attributes;
using BL.Identity;
using DAL.Core;
using Microsoft.EntityFrameworkCore;

namespace BL.API.RequestHandlers.Lists;

[Handler]
public sealed class RemoveTrailFromListHandler(Db db, IUserSessionService userSession)
{
    public async Task<bool> HandleAsync(Guid listId, Guid trailId)
    {
        var userId = userSession.GetUserId()
                     ?? throw new UnauthorizedAccessException();

        var listOwned = await db.UserTrailLists
            .AnyAsync(l => l.Id == listId && l.UserId == userId);

        if (!listOwned) return false;

        var item = await db.UserTrailListItems
            .FirstOrDefaultAsync(i => i.ListId == listId && i.TrailId == trailId);

        if (item is null) return false;

        db.UserTrailListItems.Remove(item);
        await db.SaveChangesAsync();
        return true;
    }
}
