using System.Reflection;
using BL.Core.Attributes;
using Microsoft.Extensions.DependencyInjection;

namespace BL.Core.Helpers;

public static class DependencyInjectionHelper
{
    public static IServiceCollection AddDecoratedServices(this IServiceCollection services, params Assembly[] assemblies)
    {
        if (assemblies.Length == 0)
        {
            assemblies = [Assembly.GetExecutingAssembly()];
        }

        var typesToRegister = assemblies.SelectMany(a => a.GetTypes())
            .Where(t => t is { IsClass: true, IsAbstract: false })
            .Select(t => new
            {
                Type = t,
                Attributes = t.GetCustomAttributes(true)
                    .Where(a => a is ScopedAttribute)
                    .ToList()
            })
            .Where(x => x.Attributes.Count != 0);

        foreach (var registration in typesToRegister)
        {
            var interfaces = registration.Type.GetInterfaces();
            if (interfaces.Length != 0)
            {
                foreach (var @interface in interfaces)
                {
                    services.AddScoped(@interface, registration.Type);
                }
            }
            
            services.AddScoped(registration.Type);
        }

        return services;
    }
}
