using System.Collections.Immutable;
using System.Xml;
using BL.Core.Attributes;
using Domain.App;
using NetTopologySuite.IO;

namespace BL.Gpx;

[Service]
public class GpxExporter : IGpxExporter
{
    public byte[] Export(Trail trail)
    {
        using var ms = new MemoryStream();
        Export(trail, ms);
        return ms.ToArray();
    }

    public void Export(Trail trail, Stream outputStream)
    {
        if (trail.Route is null)
            throw new InvalidOperationException("Trail has no route data to export.");

        var waypoints = new ImmutableGpxWaypointTable(
            trail.Route.Coordinates.Select(c => new GpxWaypoint(
                longitude: new GpxLongitude(c.X),
                latitude: new GpxLatitude(c.Y),
                elevationInMeters: double.IsNaN(c.Z) ? null : c.Z)));

        var segment = new GpxTrackSegment(waypoints, null);

        var track = new GpxTrack(
            name: trail.Name,
            description: trail.Description,
            comment: null,
            source: trail.SourceName,
            links: ImmutableArray<GpxWebLink>.Empty,
            number: null,
            classification: trail.TrailType.ToString(),
            extensions: null,
            segments: [segment]);

        var metadata = new GpxMetadata(
            creator: "GpxFinder",
            name: trail.Name,
            description: trail.Description,
            author: null,
            copyright: null,
            links: ImmutableArray<GpxWebLink>.Empty,
            creationTimeUtc: trail.CreatedAt.UtcDateTime,
            keywords: null,
            bounds: null,
            extensions: null);

        var gpxFile = new GpxFile
        {
            Metadata = metadata,
        };
        gpxFile.Tracks.Add(track);

        using var xmlWriter = XmlWriter.Create(outputStream, new XmlWriterSettings
        {
            Indent = true,
            CloseOutput = false,
        });

        gpxFile.WriteTo(xmlWriter, new GpxWriterSettings());
    }
}
