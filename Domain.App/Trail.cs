using Domain.App.Abstract;
using Domain.App.Enums;
using Domain.Identity;
using NetTopologySuite.Geometries;

namespace Domain.App;

public class Trail : Entity
{
    public required string Name { get; set; }
    public string? Description { get; set; }

    public TrailType TrailType { get; set; }
    public SurfaceType SurfaceType { get; set; }
    public DifficultyLevel DifficultyLevel { get; set; }

    public decimal DistanceKm { get; set; }
    public decimal ElevationGainMeters { get; set; }
    public int EstimatedDurationMinutes { get; set; }

    public bool IsDogFriendly { get; set; }

    public required string GpxFileUrl { get; set; }
    public LineString? Route { get; set; }

    public SourceType SourceType { get; set; }
    public string? SourceUrl { get; set; }
    public string? SourceName { get; set; }

    public Guid? CreatedByUserId { get; set; }
    public AppUser? CreatedByUser { get; set; }

    public double Latitude { get; set; }
    public double Longitude { get; set; }

    public required string Country { get; set; }
    public string? Region { get; set; }
    public string? City { get; set; }

    public TrailStatus Status { get; set; }

    public DateTimeOffset UpdatedAt { get; set; }

    public ICollection<TrailPhoto> Photos { get; set; } = [];
    public ICollection<TrailReview> Reviews { get; set; } = [];
    public ICollection<UserFavorite> Favorites { get; set; } = [];
}
