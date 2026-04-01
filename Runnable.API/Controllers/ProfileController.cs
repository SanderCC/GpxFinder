using BL.API.RequestHandlers.Profile;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Runnable.API.Controllers;

[ApiController, Authorize, Route("[controller]")]
public sealed class ProfileController : ControllerBase
{
    [HttpGet]
    public async Task<IActionResult> Get([FromServices] GetProfileHandler handler)
    {
        var profile = await handler.HandleAsync();
        return profile is not null ? Ok(profile) : NotFound();
    }

    [HttpPut]
    public async Task<IActionResult> Update(
        [FromServices] UpdateProfileHandler handler, UpdateProfileHandler.Request request)
    {
        var result = await handler.HandleAsync(request);
        return result.Succeeded ? Ok(result) : BadRequest(result);
    }

    [HttpPut("password")]
    public async Task<IActionResult> ChangePassword(
        [FromServices] ChangePasswordHandler handler, ChangePasswordHandler.Request request)
    {
        var result = await handler.HandleAsync(request);
        return result.Succeeded ? Ok(result) : BadRequest(result);
    }
}
