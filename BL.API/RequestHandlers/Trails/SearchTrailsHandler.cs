using BL.Core.Attributes;
using DAL.Core;
using Domain.App.Enums;
using Microsoft.EntityFrameworkCore;

namespace BL.API.RequestHandlers.Trails;

[Handler]
public sealed class SearchTrailsHandler(Db db)
{
    public async Task<Response> HandleAsync(Request model)
    {
        var query = db.Trails
            .Where(t => t.Status == TrailStatus.Active)
            .AsQueryable();

        if (!string.IsNullOrWhiteSpace(model.Name))
            query = query.Where(t => t.Name.Contains(model.Name));

        if (!string.IsNullOrWhiteSpace(model.City))
            query = query.Where(t => t.City != null && t.City.Contains(model.City));

        if (!string.IsNullOrWhiteSpace(model.Region))
            query = query.Where(t => t.Region != null && t.Region.Contains(model.Region));

        if (model.Type.HasValue)
            query = query.Where(t => t.TrailType.HasFlag(model.Type.Value));

        if (model.Difficulty.HasValue)
            query = query.Where(t => t.DifficultyLevel == model.Difficulty.Value);

        if (model.SurfaceType.HasValue)
            query = query.Where(t => t.SurfaceType.HasFlag(model.SurfaceType.Value));

        if (model.MinDistance.HasValue)
            query = query.Where(t => t.DistanceKm >= model.MinDistance.Value);

        if (model.MaxDistance.HasValue)
            query = query.Where(t => t.DistanceKm <= model.MaxDistance.Value);

        var totalCount = await query.CountAsync();

        var page = model.Page ?? 1;
        var pageSize = model.PageSize ?? 20;

        var items = await query
            .OrderByDescending(t => t.CreatedAt)
            .Skip((page - 1) * pageSize)
            .Take(pageSize)
            .Select(t => new TrailSummary(
                t.Id, t.Name, t.TrailType, t.DifficultyLevel,
                t.DistanceKm, t.ElevationGainMeters,
                t.Latitude, t.Longitude, t.Region, t.Country))
            .ToListAsync();

        return new Response(items, totalCount, page, pageSize);
    }

    public sealed record Request(
        string? Name,
        string? City,
        string? Region,
        TrailType? Type,
        DifficultyLevel? Difficulty,
        SurfaceType? SurfaceType,
        decimal? MinDistance,
        decimal? MaxDistance,
        int? Page,
        int? PageSize);

    public sealed record TrailSummary(
        Guid Id,
        string Name,
        TrailType TrailType,
        DifficultyLevel Difficulty,
        decimal DistanceKm,
        decimal ElevationGainMeters,
        double Latitude,
        double Longitude,
        string? Region,
        string Country);

    public sealed record Response(List<TrailSummary> Items, int TotalCount, int Page, int PageSize);
}
