using BL.API.RequestHandlers.Favorites;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Runnable.API.Controllers;

[ApiController, Authorize, Route("[controller]")]
public sealed class FavoritesController : ControllerBase
{
    [HttpGet]
    public async Task<IActionResult> GetAll([FromServices] GetFavoritesHandler handler)
        => Ok(await handler.HandleAsync());

    [HttpPost("{trailId:guid}")]
    public async Task<IActionResult> Add(
        [FromServices] AddFavoriteHandler handler, Guid trailId)
    {
        var added = await handler.HandleAsync(trailId);
        return added ? Ok() : Conflict();
    }

    [HttpDelete("{trailId:guid}")]
    public async Task<IActionResult> Remove(
        [FromServices] RemoveFavoriteHandler handler, Guid trailId)
    {
        var removed = await handler.HandleAsync(trailId);
        return removed ? Ok() : NotFound();
    }
}
