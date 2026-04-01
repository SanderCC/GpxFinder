using BL.Core.Attributes;
using BL.Identity;
using DAL.Core;
using Microsoft.EntityFrameworkCore;

namespace BL.API.RequestHandlers.Lists;

[Handler]
public sealed class UpdateListHandler(
    Db db,
    IUserSessionService userSession)
{
    public async Task<bool> HandleAsync(Guid listId, Request model)
    {
        var userId = userSession.GetUserId()
                     ?? throw new UnauthorizedAccessException();

        var list = await db.UserTrailLists
            .FirstOrDefaultAsync(l => l.Id == listId && l.UserId == userId);

        if (list is null) return false;

        list.Name = model.Name;
        await db.SaveChangesAsync();
        return true;
    }

    public sealed record Request(string Name);
}
