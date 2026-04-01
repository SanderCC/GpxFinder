using NetTopologySuite.Geometries;

namespace BL.Gpx.Models;

public class GpxParseResult
{
    public required string Name { get; set; }
    public string? Description { get; set; }
    public required LineString Route { get; set; }
    public double Latitude { get; set; }
    public double Longitude { get; set; }
    public decimal DistanceKm { get; set; }
    public decimal ElevationGainMeters { get; set; }
    public int EstimatedDurationMinutes { get; set; }
    public List<ParsedWaypoint> Waypoints { get; set; } = [];
}

public class ParsedWaypoint
{
    public required string Name { get; set; }
    public double Latitude { get; set; }
    public double Longitude { get; set; }
    public double? Elevation { get; set; }
}
