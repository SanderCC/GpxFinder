using BL.Core.Attributes;
using DAL.Core;
using Domain.App;
using Microsoft.EntityFrameworkCore;

namespace BL.API.RequestHandlers.Trails;

[Handler]
public sealed class GetTrailHandler(Db db)
{
    public async Task<Trail?> HandleAsync(Guid id)
    {
        return await db.Trails
            .Include(t => t.Photos)
            .Include(t => t.Reviews)
            .FirstOrDefaultAsync(t => t.Id == id);
    }
}
