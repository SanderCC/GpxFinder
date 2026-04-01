using BL.Core.Attributes;
using BL.Identity;
using DAL.Core;
using Domain.App.Enums;
using Microsoft.EntityFrameworkCore;

namespace BL.API.RequestHandlers.Favorites;

[Handler]
public sealed class GetFavoritesHandler(Db db, IUserSessionService userSession)
{
    public async Task<List<FavoriteTrailDto>> HandleAsync()
    {
        var userId = userSession.GetUserId()
                     ?? throw new UnauthorizedAccessException();

        return await db.UserFavorites
            .Where(f => f.UserId == userId)
            .Select(f => new FavoriteTrailDto(
                f.Trail!.Id, f.Trail.Name, f.Trail.TrailType, f.Trail.DifficultyLevel,
                f.Trail.DistanceKm, f.Trail.ElevationGainMeters,
                f.CreatedAt))
            .ToListAsync();
    }

    public sealed record FavoriteTrailDto(
        Guid Id, string Name, TrailType TrailType, DifficultyLevel Difficulty,
        decimal DistanceKm, decimal ElevationGainMeters, DateTime FavoritedAt);
}
