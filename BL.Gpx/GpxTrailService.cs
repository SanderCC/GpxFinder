using BL.Core.Attributes;
using Domain.App;
using Domain.App.Enums;

namespace BL.Gpx;

[Service]
public class GpxTrailService(IGpxParser gpxParser) : IGpxTrailService
{
    public Trail CreateTrailFromGpx(string gpxFilePath, string gpxFileUrl, Guid? createdByUserId = null)
    {
        using var stream = File.OpenRead(gpxFilePath);
        return CreateTrailFromGpx(stream, gpxFileUrl, createdByUserId);
    }

    public Trail CreateTrailFromGpx(Stream gpxStream, string gpxFileUrl, Guid? createdByUserId = null)
    {
        var result = gpxParser.Parse(gpxStream);
        var now = DateTime.UtcNow;

        return new Trail
        {
            Id = Guid.CreateVersion7(),
            Name = result.Name,
            Description = result.Description,
            GpxFileUrl = gpxFileUrl,
            Route = result.Route,
            Latitude = result.Latitude,
            Longitude = result.Longitude,
            DistanceKm = result.DistanceKm,
            ElevationGainMeters = result.ElevationGainMeters,
            EstimatedDurationMinutes = result.EstimatedDurationMinutes,
            DifficultyLevel = ClassifyDifficulty(result.DistanceKm, result.ElevationGainMeters),
            SourceType = createdByUserId.HasValue ? SourceType.UserCreated : SourceType.Crawled,
            CreatedByUserId = createdByUserId,
            Country = "",
            Status = TrailStatus.Active,
            CreatedAt = now,
            UpdatedAt = now,
        };
    }

    private static DifficultyLevel ClassifyDifficulty(decimal distanceKm, decimal elevationGain)
    {
        // Simple heuristic based on distance and elevation
        var score = (double)distanceKm + (double)elevationGain / 100.0;

        return score switch
        {
            < 15 => DifficultyLevel.Beginner,
            < 40 => DifficultyLevel.Experienced,
            _ => DifficultyLevel.Advanced,
        };
    }
}
