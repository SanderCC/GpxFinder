using BL.Core.Attributes;
using BL.Identity;
using DAL.Core;
using Microsoft.EntityFrameworkCore;

namespace BL.API.RequestHandlers.Lists;

[Handler]
public sealed class DeleteListHandler(Db db, IUserSessionService userSession)
{
    public async Task<bool> HandleAsync(Guid listId)
    {
        var userId = userSession.GetUserId()
                     ?? throw new UnauthorizedAccessException();

        var list = await db.UserTrailLists
            .FirstOrDefaultAsync(l => l.Id == listId && l.UserId == userId);

        if (list is null) return false;

        db.UserTrailLists.Remove(list);
        await db.SaveChangesAsync();
        return true;
    }
}
