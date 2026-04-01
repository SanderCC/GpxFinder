using BL.Core.Attributes;
using BL.Gpx;
using DAL.Core;
using Microsoft.EntityFrameworkCore;

namespace BL.API.RequestHandlers.Trails;

[Handler]
public sealed class DownloadGpxHandler(Db db, IGpxExporter gpxExporter)
{
    public async Task<Response?> HandleAsync(Guid trailId)
    {
        var trail = await db.Trails.FirstOrDefaultAsync(t => t.Id == trailId);
        if (trail is null) return null;

        var gpxBytes = gpxExporter.Export(trail);
        var fileName = $"{trail.Name.Replace(' ', '_')}.gpx";

        return new Response(gpxBytes, fileName);
    }

    public sealed record Response(byte[] FileBytes, string FileName);
}
