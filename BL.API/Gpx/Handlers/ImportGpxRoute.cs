using BL.Core.Attributes;
using BL.Gpx;
using DAL.Core;
using Microsoft.AspNetCore.Http;

namespace BL.API.Gpx.Handlers;

[Handler]
public sealed class ImportGpxRoute(IGpxTrailService gpxTrailService, Db db)
{
    public async Task<Response> HandleAsync(Request model)
    {
        var trail = gpxTrailService.CreateTrailFromGpx(model.GpxFile.OpenReadStream(), model.GpxFile.FileName);
        db.Add(trail);
        await db.SaveChangesAsync();
        return new Response(trail.Id);
    }
    
    public sealed record Request(IFormFile GpxFile);
    public sealed record Response(Guid TrailId);
}