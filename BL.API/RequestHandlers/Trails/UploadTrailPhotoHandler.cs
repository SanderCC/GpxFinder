using BL.Core.Attributes;
using BL.Identity;
using DAL.Core;
using Domain.App;
using Domain.App.Enums;
using Microsoft.AspNetCore.Http;

namespace BL.API.RequestHandlers.Trails;

[Handler]
public sealed class UploadTrailPhotoHandler(
    Db db,
    IUserSessionService userSession)
{
    public async Task<Response> HandleAsync(Guid trailId, Request model)
    {
        var photo = new TrailPhoto
        {
            Id = Guid.CreateVersion7(),
            TrailId = trailId,
            PhotoUrl = "", // TODO: upload to blob storage and set URL
            Latitude = model.Latitude,
            Longitude = model.Longitude,
            UploadedByUserId = userSession.GetUserId(),
            Source = PhotoSource.UserUploaded,
            CreatedAt = DateTime.UtcNow,
        };

        db.TrailPhotos.Add(photo);
        await db.SaveChangesAsync();

        return new Response(photo.Id);
    }

    public sealed record Request(
        IFormFile Photo,
        double? Latitude,
        double? Longitude);
    public sealed record Response(Guid PhotoId);
}
