using System.Reflection;
using System.Runtime.CompilerServices;
using BL.Core.Helpers;
using DAL.Core;
using DAL.SqlServer;
using Domain.Identity;
using Microsoft.AspNetCore.Identity;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
// Learn more about configuring OpenAPI at https://aka.ms/aspnet/openapi
builder.Services
    .AddDbContext<Db, SqlServerContext>()
    .AddHttpClient()
    .AddIdentityApiEndpoints<AppUser>()
    .AddRoles<AppRole>()
    .AddEntityFrameworkStores<Db>()
    .AddDefaultTokenProviders();

builder.Services
    .AddDecoratedServices(
        Assembly.GetExecutingAssembly(),
        typeof(BL.API.RequestHandlers.Identity.LoginHandler).Assembly,
        typeof(BL.Crawler.Core.ICrawler).Assembly,
        typeof(BL.Crawler.EuroVeloBelgiumCrawler.EuroVeloBelgiumCrawler).Assembly)
    .AddOpenApi()
    .AddSwaggerGen(options =>
    {
        options.CustomSchemaIds(type => type.FullName?.Replace('+', '.'));
    })
    .AddControllers();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();
app.MapGroup("/auth").MapIdentityApi<AppUser>();

app.Run();