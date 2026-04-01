using BL.Core.Attributes;
using DAL.Core;
using Domain.App;
using Microsoft.EntityFrameworkCore;

namespace BL.API.RequestHandlers.Trails;

[Handler]
public sealed class GetTrailPhotosHandler(Db db)
{
    public async Task<List<TrailPhoto>> HandleAsync(Guid trailId)
    {
        return await db.TrailPhotos
            .Where(p => p.TrailId == trailId)
            .OrderByDescending(p => p.CreatedAt)
            .ToListAsync();
    }
}
