using BL.Core.Attributes;
using BL.Identity;
using DAL.Core;
using Domain.App;

namespace BL.API.RequestHandlers.Lists;

[Handler]
public sealed class CreateListHandler(
    Db db,
    IUserSessionService userSession)
{
    public async Task<Response> HandleAsync(Request model)
    {
        var userId = userSession.GetUserId()
                     ?? throw new UnauthorizedAccessException();

        var list = new UserTrailList
        {
            Id = Guid.CreateVersion7(),
            UserId = userId,
            Name = model.Name,
            CreatedAt = DateTime.UtcNow,
        };

        db.UserTrailLists.Add(list);
        await db.SaveChangesAsync();

        return new Response(list.Id);
    }

    public sealed record Request(string Name);
    public sealed record Response(Guid ListId);
}
