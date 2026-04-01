using BL.Core.Attributes;
using BL.Identity;
using DAL.Core;
using Domain.App;
using Microsoft.EntityFrameworkCore;

namespace BL.API.RequestHandlers.Lists;

[Handler]
public sealed class AddTrailToListHandler(Db db, IUserSessionService userSession)
{
    public async Task<bool> HandleAsync(Guid listId, Guid trailId)
    {
        var userId = userSession.GetUserId()
                     ?? throw new UnauthorizedAccessException();

        var listExists = await db.UserTrailLists
            .AnyAsync(l => l.Id == listId && l.UserId == userId);

        if (!listExists) return false;

        var alreadyAdded = await db.UserTrailListItems
            .AnyAsync(i => i.ListId == listId && i.TrailId == trailId);

        if (alreadyAdded) return false;

        db.UserTrailListItems.Add(new UserTrailListItem
        {
            ListId = listId,
            TrailId = trailId,
            AddedAt = DateTime.UtcNow,
        });

        await db.SaveChangesAsync();
        return true;
    }
}
