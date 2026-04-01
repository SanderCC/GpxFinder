using BL.Core.Attributes;
using BL.Identity;
using DAL.Core;
using Microsoft.EntityFrameworkCore;

namespace BL.API.RequestHandlers.Lists;

[Handler]
public sealed class GetListsHandler(Db db, IUserSessionService userSession)
{
    public async Task<List<TrailListDto>> HandleAsync()
    {
        var userId = userSession.GetUserId()
                     ?? throw new UnauthorizedAccessException();

        return await db.UserTrailLists
            .Where(l => l.UserId == userId)
            .Select(l => new TrailListDto(l.Id, l.Name, l.CreatedAt, l.Items.Count))
            .ToListAsync();
    }

    public sealed record TrailListDto(Guid Id, string Name, DateTime CreatedAt, int TrailCount);
}
