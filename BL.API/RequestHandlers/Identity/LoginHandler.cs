using BL.Core.Attributes;

namespace BL.API.RequestHandlers.Identity;

[Handler]
public sealed class LoginHandler
{
    public Task<Response> HandleAsync(Request model)
    {
        throw new NotImplementedException();
    }
    
    public sealed record Request(
        string Username,
        string Password);
    public sealed record Response(
        string Token,
        string[] Errors);
}