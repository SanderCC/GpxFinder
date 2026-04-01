using BL.Core.Attributes;
using BL.Identity;
using DAL.Core;
using Domain.App;

namespace BL.API.RequestHandlers.Trails;

[Handler]
public sealed class AddTrailReviewHandler(Db db, IUserSessionService userSession)
{
    public async Task<Response> HandleAsync(Guid trailId, Request model)
    {
        var userId = userSession.GetUserId()
                     ?? throw new UnauthorizedAccessException();

        var review = new TrailReview
        {
            Id = Guid.CreateVersion7(),
            TrailId = trailId,
            UserId = userId,
            Rating = model.Rating,
            Comment = model.Comment,
            IsReport = model.IsReport,
            CreatedAt = DateTime.UtcNow,
        };

        db.TrailReviews.Add(review);
        await db.SaveChangesAsync();

        return new Response(review.Id);
    }

    public sealed record Request(int Rating, string? Comment, bool IsReport = false);
    public sealed record Response(Guid ReviewId);
}
