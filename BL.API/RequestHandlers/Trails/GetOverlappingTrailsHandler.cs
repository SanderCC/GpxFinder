using BL.Core.Attributes;
using DAL.Core;
using Domain.App.Enums;
using Microsoft.EntityFrameworkCore;

namespace BL.API.RequestHandlers.Trails;

[Handler]
public sealed class GetOverlappingTrailsHandler(Db db)
{
    public async Task<List<TrailSummary>> HandleAsync(Guid trailId)
    {
        var trail = await db.Trails.FirstOrDefaultAsync(t => t.Id == trailId);
        if (trail is null) return [];

        const double radiusDegrees = 0.15; // ~15 km rough approximation

        return await db.Trails
            .Where(t => t.Id != trailId && t.Status == TrailStatus.Active)
            .Where(t => Math.Abs(t.Latitude - trail.Latitude) < radiusDegrees
                        && Math.Abs(t.Longitude - trail.Longitude) < radiusDegrees)
            .OrderBy(t => Math.Abs(t.Latitude - trail.Latitude) + Math.Abs(t.Longitude - trail.Longitude))
            .Take(5)
            .Select(t => new TrailSummary(
                t.Id, t.Name, t.TrailType, t.DifficultyLevel,
                t.DistanceKm, t.ElevationGainMeters))
            .ToListAsync();
    }

    public sealed record TrailSummary(
        Guid Id,
        string Name,
        TrailType TrailType,
        DifficultyLevel Difficulty,
        decimal DistanceKm,
        decimal ElevationGainMeters);
}
