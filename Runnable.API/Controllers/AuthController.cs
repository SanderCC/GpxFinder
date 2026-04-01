using BL.API.Handlers.Identity;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Runnable.API.Controllers;

[ApiController, AllowAnonymous, Route("[controller]/[action]")]
public sealed class AuthController : ControllerBase
{
    [HttpPost, ProducesResponseType(typeof(LoginHandler.Response), StatusCodes.Status200OK)]
    public async Task<IActionResult> Login([FromServices] LoginHandler handler, LoginHandler.Request request)
        => Ok(await handler.HandleAsync(request));
}