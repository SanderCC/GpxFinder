using System.Reflection;
using System.Text;
using BL.Core.Helpers;
using DAL.Core;
using DAL.SqlServer;
using Domain.Identity;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Identity;
using Microsoft.IdentityModel.Tokens;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
// Learn more about configuring OpenAPI at https://aka.ms/aspnet/openapi
builder.Services
    .AddDbContext<Db, SqlServerContext>()
    .AddHttpClient()
    .AddHttpContextAccessor()
    .AddIdentity<AppUser, AppRole>()
    .AddEntityFrameworkStores<Db>()
    .AddDefaultTokenProviders();

builder.Services
    .AddAuthentication(options =>
    {
        options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
        options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
    })
    .AddJwtBearer(options =>
    {
        options.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuer = true,
            ValidateAudience = true,
            ValidateLifetime = true,
            ValidateIssuerSigningKey = true,
            ValidIssuer = builder.Configuration["Jwt:Issuer"],
            ValidAudience = builder.Configuration["Jwt:Audience"],
            IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(builder.Configuration["Jwt:Secret"]!))
        };
    });

builder.Services
    .AddDecoratedServices(
        Assembly.GetExecutingAssembly(),
        typeof(BL.API.RequestHandlers.Identity.LoginHandler).Assembly,
        typeof(BL.Crawler.Core.ICrawler).Assembly,
        typeof(BL.Crawler.EuroVeloBelgiumCrawler.EuroVeloBelgiumCrawler).Assembly,
        typeof(BL.Identity.IUserSessionService).Assembly,
        typeof(BL.Gpx.IGpxExporter).Assembly)
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

app.Run();