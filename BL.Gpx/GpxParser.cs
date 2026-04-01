using System.Xml;
using BL.Core.Attributes;
using BL.Gpx.Models;
using NetTopologySuite.Geometries;
using NetTopologySuite.IO;

namespace BL.Gpx;

[Service]
public class GpxParser : IGpxParser
{
    private static readonly GeometryFactory GeometryFactory = new(new PrecisionModel(), 4326);

    public GpxParseResult Parse(string gpxFilePath)
    {
        using var stream = File.OpenRead(gpxFilePath);
        return Parse(stream);
    }

    public GpxParseResult Parse(Stream gpxStream)
    {
        using var xmlReader = XmlReader.Create(gpxStream);
        var gpxFile = GpxFile.ReadFrom(xmlReader, new GpxReaderSettings
        {
            DefaultCreatorIfMissing = "GpxFinder",
            IgnoreBadDateTime = true,
            IgnoreUnexpectedChildrenOfTopLevelElement = true,
            IgnoreVersionAttribute = true,
        });

        var name = gpxFile.Metadata.Name
                   ?? gpxFile.Tracks.FirstOrDefault()?.Name
                   ?? "Unnamed Trail";

        var description = gpxFile.Metadata.Description
                          ?? gpxFile.Tracks.FirstOrDefault()?.Description;

        var trackPoints = ExtractTrackPoints(gpxFile);

        if (trackPoints.Count < 2)
            throw new InvalidOperationException("GPX file must contain at least 2 track or route points.");

        var coordinates = trackPoints
            .Select(p => new CoordinateZ(p.Longitude, p.Latitude, p.Elevation ?? double.NaN))
            .ToArray();

        var route = GeometryFactory.CreateLineString(coordinates);
        var distanceKm = CalculateDistanceKm(trackPoints);
        var elevationGain = CalculateElevationGain(trackPoints);
        var durationMinutes = EstimateDuration(distanceKm, elevationGain);
        var center = route.Centroid;

        var waypoints = gpxFile.Waypoints
            .Select(w => new ParsedWaypoint
            {
                Name = w.Name ?? "Waypoint",
                Latitude = (double)w.Latitude,
                Longitude = (double)w.Longitude,
                Elevation = w.ElevationInMeters.HasValue ? (double)w.ElevationInMeters : null,
            })
            .ToList();

        return new GpxParseResult
        {
            Name = name,
            Description = description,
            Route = route,
            Latitude = center.Y,
            Longitude = center.X,
            DistanceKm = Math.Round(distanceKm, 2),
            ElevationGainMeters = Math.Round(elevationGain, 0),
            EstimatedDurationMinutes = durationMinutes,
            Waypoints = waypoints,
        };
    }

    private static List<TrackPoint> ExtractTrackPoints(GpxFile gpxFile)
    {
        var points = gpxFile.Tracks
            .SelectMany(t => t.Segments)
            .SelectMany(s => s.Waypoints)
            .Select(ToTrackPoint)
            .ToList();

        if (points.Count >= 2) return points;

        return gpxFile.Routes
            .SelectMany(r => r.Waypoints)
            .Select(ToTrackPoint)
            .ToList();
    }

    private static TrackPoint ToTrackPoint(GpxWaypoint w) => new()
    {
        Latitude = (double)w.Latitude,
        Longitude = (double)w.Longitude,
        Elevation = w.ElevationInMeters.HasValue ? (double)w.ElevationInMeters : null,
    };

    private static decimal CalculateDistanceKm(List<TrackPoint> points)
    {
        double totalMeters = 0;
        for (var i = 1; i < points.Count; i++)
        {
            totalMeters += HaversineDistance(points[i - 1], points[i]);
        }

        return (decimal)(totalMeters / 1000.0);
    }

    private static decimal CalculateElevationGain(List<TrackPoint> points)
    {
        double gain = 0;
        for (var i = 1; i < points.Count; i++)
        {
            if (points[i].Elevation is { } current && points[i - 1].Elevation is { } previous)
            {
                var diff = current - previous;
                if (diff > 0)
                    gain += diff;
            }
        }

        return (decimal)gain;
    }

    private static int EstimateDuration(decimal distanceKm, decimal elevationGain)
    {
        var baseMinutes = (double)distanceKm / 5.0 * 60.0;
        var elevationMinutes = (double)elevationGain / 10.0;
        return (int)Math.Ceiling(baseMinutes + elevationMinutes);
    }

    private static double HaversineDistance(TrackPoint a, TrackPoint b)
    {
        const double earthRadiusMeters = 6371000;

        var dLat = ToRadians(b.Latitude - a.Latitude);
        var dLon = ToRadians(b.Longitude - a.Longitude);

        var aLat = ToRadians(a.Latitude);
        var bLat = ToRadians(b.Latitude);

        var h = Math.Sin(dLat / 2) * Math.Sin(dLat / 2)
                + Math.Cos(aLat) * Math.Cos(bLat)
                  * Math.Sin(dLon / 2) * Math.Sin(dLon / 2);

        var c = 2 * Math.Atan2(Math.Sqrt(h), Math.Sqrt(1 - h));

        return earthRadiusMeters * c;
    }

    private static double ToRadians(double degrees) => degrees * Math.PI / 180.0;

    private sealed class TrackPoint
    {
        public double Latitude { get; init; }
        public double Longitude { get; init; }
        public double? Elevation { get; init; }
    }
}
