using BL.API.RequestHandlers.Lists;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Runnable.API.Controllers;

[ApiController, Authorize, Route("[controller]")]
public sealed class ListsController : ControllerBase
{
    [HttpGet]
    public async Task<IActionResult> GetAll([FromServices] GetListsHandler handler)
        => Ok(await handler.HandleAsync());

    [HttpPost]
    public async Task<IActionResult> Create(
        [FromServices] CreateListHandler handler, CreateListHandler.Request request)
        => Ok(await handler.HandleAsync(request));

    [HttpPut("{id:guid}")]
    public async Task<IActionResult> Update(
        [FromServices] UpdateListHandler handler, Guid id, UpdateListHandler.Request request)
    {
        var updated = await handler.HandleAsync(id, request);
        return updated ? Ok() : NotFound();
    }

    [HttpDelete("{id:guid}")]
    public async Task<IActionResult> Delete(
        [FromServices] DeleteListHandler handler, Guid id)
    {
        var deleted = await handler.HandleAsync(id);
        return deleted ? Ok() : NotFound();
    }

    [HttpPost("{id:guid}/trails/{trailId:guid}")]
    public async Task<IActionResult> AddTrail(
        [FromServices] AddTrailToListHandler handler, Guid id, Guid trailId)
    {
        var added = await handler.HandleAsync(id, trailId);
        return added ? Ok() : Conflict();
    }

    [HttpDelete("{id:guid}/trails/{trailId:guid}")]
    public async Task<IActionResult> RemoveTrail(
        [FromServices] RemoveTrailFromListHandler handler, Guid id, Guid trailId)
    {
        var removed = await handler.HandleAsync(id, trailId);
        return removed ? Ok() : NotFound();
    }
}
