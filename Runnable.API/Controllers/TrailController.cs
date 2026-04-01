using BL.API.RequestHandlers.Gpx;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Runnable.API.Controllers;

[ApiController, AllowAnonymous, Route("[controller]/[action]")]
public sealed class TrailController : ControllerBase
{
    [HttpPost, ProducesResponseType(typeof(ImportGpxRouteHandler.Response), StatusCodes.Status200OK)]
    public async Task<IActionResult> Gpx([FromServices] ImportGpxRouteHandler handler, ImportGpxRouteHandler.Request request)
        => Ok(await handler.HandleAsync(request));
}