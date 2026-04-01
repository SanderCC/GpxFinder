using System.Xml.Linq;
using BL.Core.Attributes;
using BL.Gpx.Models;
using NetTopologySuite.Geometries;

namespace BL.Gpx;

[Scoped]
[Service]
public class GpxParser : IGpxParser
{
    private static readonly XNamespace GpxNs = "http://www.topografix.com/GPX/1/1";
    private static readonly XNamespace GpxNsLegacy = "http://www.topografix.com/GPX/1/0";
    private static readonly GeometryFactory GeometryFactory = new(new PrecisionModel(), 4326);

    public GpxParseResult Parse(string gpxFilePath)
    {
        using var stream = File.OpenRead(gpxFilePath);
        return Parse(stream);
    }

    public GpxParseResult Parse(Stream gpxStream)
    {
        var doc = XDocument.Load(gpxStream);
        var root = doc.Root ?? throw new InvalidOperationException("Invalid GPX: missing root element.");

        var ns = DetectNamespace(root);

        var name = root.Element(ns + "metadata")?.Element(ns + "name")?.Value
                   ?? root.Element(ns + "trk")?.Element(ns + "name")?.Value
                   ?? "Unnamed Trail";

        var description = root.Element(ns + "metadata")?.Element(ns + "desc")?.Value
                          ?? root.Element(ns + "trk")?.Element(ns + "desc")?.Value;

        var trackPoints = ExtractTrackPoints(root, ns);

        if (trackPoints.Count < 2)
        {
            trackPoints = ExtractRoutePoints(root, ns);
        }

        if (trackPoints.Count < 2)
        {
            throw new InvalidOperationException("GPX file must contain at least 2 track or route points.");
        }

        var coordinates = trackPoints
            .Select(p => new CoordinateZ(p.Longitude, p.Latitude, p.Elevation ?? double.NaN))
            .ToArray();

        var route = GeometryFactory.CreateLineString(coordinates);

        var distanceKm = CalculateDistanceKm(trackPoints);
        var elevationGain = CalculateElevationGain(trackPoints);
        var durationMinutes = EstimateDuration(distanceKm, elevationGain);

        var center = route.Centroid;

        var waypoints = root.Elements(ns + "wpt")
            .Select(wpt => new GpxWaypoint
            {
                Name = wpt.Element(ns + "name")?.Value ?? "Waypoint",
                Latitude = (double)wpt.Attribute("lat")!,
                Longitude = (double)wpt.Attribute("lon")!,
                Elevation = ParseOptionalDouble(wpt.Element(ns + "ele")?.Value),
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

    private static XNamespace DetectNamespace(XElement root)
    {
        var ns = root.GetDefaultNamespace();
        if (ns == GpxNs || ns == GpxNsLegacy)
            return ns;

        if (root.Elements(GpxNs + "trk").Any() || root.Elements(GpxNs + "rte").Any())
            return GpxNs;

        if (root.Elements(GpxNsLegacy + "trk").Any() || root.Elements(GpxNsLegacy + "rte").Any())
            return GpxNsLegacy;

        return GpxNs;
    }

    private static List<TrackPoint> ExtractTrackPoints(XElement root, XNamespace ns)
    {
        return root.Descendants(ns + "trkpt")
            .Select(ParseTrackPoint)
            .ToList();
    }

    private static List<TrackPoint> ExtractRoutePoints(XElement root, XNamespace ns)
    {
        return root.Descendants(ns + "rtept")
            .Select(ParseTrackPoint)
            .ToList();
    }

    private static TrackPoint ParseTrackPoint(XElement element)
    {
        return new TrackPoint
        {
            Latitude = (double)element.Attribute("lat")!,
            Longitude = (double)element.Attribute("lon")!,
            Elevation = ParseOptionalDouble(element.Element(element.Name.Namespace + "ele")?.Value),
        };
    }

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
        // Naismith's rule: ~5 km/h base + 1 min per 10m elevation gain
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

    private static double? ParseOptionalDouble(string? value) =>
        double.TryParse(value, System.Globalization.NumberStyles.Float,
            System.Globalization.CultureInfo.InvariantCulture, out var result)
            ? result
            : null;

    private sealed class TrackPoint
    {
        public double Latitude { get; init; }
        public double Longitude { get; init; }
        public double? Elevation { get; init; }
    }
}
