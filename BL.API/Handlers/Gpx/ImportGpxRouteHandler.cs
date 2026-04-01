using BL.Core.Attributes;
using BL.Gpx;
using BL.Identity;
using DAL.Core;
using Microsoft.AspNetCore.Http;

namespace BL.API.Handlers.Gpx;

[Handler]
public sealed class ImportGpxRouteHandler(IGpxTrailService gpxTrailService, IUserSessionService userSessionService, Db db)
{
    public async Task<Response> HandleAsync(Request model)
    {
        var trail = gpxTrailService.CreateTrailFromGpx(model.GpxFile.OpenReadStream(), model.GpxFile.FileName);
        trail.CreatedByUserId = userSessionService.GetUserId();
        db.Add(trail);
        await db.SaveChangesAsync();
        return new Response(trail.Id);
    }
    
    public sealed record Request(IFormFile GpxFile);
    public sealed record Response(Guid TrailId);
}
