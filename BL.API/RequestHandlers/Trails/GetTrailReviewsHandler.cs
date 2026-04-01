using BL.Core.Attributes;
using DAL.Core;
using Microsoft.EntityFrameworkCore;

namespace BL.API.RequestHandlers.Trails;

[Handler]
public sealed class GetTrailReviewsHandler(Db db)
{
    public async Task<List<ReviewDto>> HandleAsync(Guid trailId)
    {
        return await db.TrailReviews
            .Where(r => r.TrailId == trailId && !r.IsReport)
            .OrderByDescending(r => r.CreatedAt)
            .Select(r => new ReviewDto(
                r.Id, r.User!.FirstName + " " + r.User.LastName[..1] + ".",
                r.Rating, r.Comment))
            .ToListAsync();
    }

    public sealed record ReviewDto(
        Guid Id,
        string User,
        int Rating,
        string? Comment);
}
