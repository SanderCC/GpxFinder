using BL.API.RequestHandlers.Identity;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Runnable.API.Controllers;

[ApiController, AllowAnonymous, Route("[controller]")]
public sealed class AuthController : ControllerBase
{
    [HttpPost("login")]
    public async Task<IActionResult> Login([FromServices] LoginHandler handler, LoginHandler.Request request)
        => Ok(await handler.HandleAsync(request));

    [HttpPost("register")]
    public async Task<IActionResult> Register([FromServices] RegisterHandler handler, RegisterHandler.Request request)
    {
        var result = await handler.HandleAsync(request);
        return result.Succeeded ? Ok(result) : BadRequest(result);
    }
}
