using BL.API.RequestHandlers.Gpx;
using BL.API.RequestHandlers.Trails;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Runnable.API.Controllers;

[ApiController, Route("[controller]")]
public sealed class TrailController : ControllerBase
{
    [HttpGet, AllowAnonymous]
    public async Task<IActionResult> Search(
        [FromServices] SearchTrailsHandler handler,
        [FromQuery] SearchTrailsHandler.Request request)
        => Ok(await handler.HandleAsync(request));

    [HttpGet("{id:guid}"), AllowAnonymous]
    public async Task<IActionResult> GetById(
        [FromServices] GetTrailHandler handler, Guid id)
    {
        var trail = await handler.HandleAsync(id);
        return trail is not null ? Ok(trail) : NotFound();
    }

    [HttpGet("{id:guid}/gpx"), AllowAnonymous]
    public async Task<IActionResult> DownloadGpx(
        [FromServices] DownloadGpxHandler handler, Guid id)
    {
        var result = await handler.HandleAsync(id);
        if (result is null) return NotFound();
        return File(result.FileBytes, "application/gpx+xml", result.FileName);
    }

    [HttpGet("{id:guid}/photos"), AllowAnonymous]
    public async Task<IActionResult> GetPhotos(
        [FromServices] GetTrailPhotosHandler handler, Guid id)
        => Ok(await handler.HandleAsync(id));

    [HttpGet("{id:guid}/reviews"), AllowAnonymous]
    public async Task<IActionResult> GetReviews(
        [FromServices] GetTrailReviewsHandler handler, Guid id)
        => Ok(await handler.HandleAsync(id));

    [HttpGet("{id:guid}/overlapping"), AllowAnonymous]
    public async Task<IActionResult> GetOverlapping(
        [FromServices] GetOverlappingTrailsHandler handler, Guid id)
        => Ok(await handler.HandleAsync(id));

    [HttpPost, Authorize]
    public async Task<IActionResult> ImportGpx(
        [FromServices] ImportGpxRouteHandler handler, [FromForm] ImportGpxRouteHandler.Request request)
        => Ok(await handler.HandleAsync(request));

    [HttpPost("{id:guid}/photos"), Authorize]
    public async Task<IActionResult> UploadPhoto(
        [FromServices] UploadTrailPhotoHandler handler, Guid id, [FromForm] UploadTrailPhotoHandler.Request request)
        => Ok(await handler.HandleAsync(id, request));

    [HttpPost("{id:guid}/reviews"), Authorize]
    public async Task<IActionResult> AddReview(
        [FromServices] AddTrailReviewHandler handler, Guid id, AddTrailReviewHandler.Request request)
        => Ok(await handler.HandleAsync(id, request));
}
