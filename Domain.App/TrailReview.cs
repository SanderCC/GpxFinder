using Domain.Identity;

namespace Domain.App;

public class TrailReview
{
    public Guid Id { get; set; }

    public Guid TrailId { get; set; }
    public Trail? Trail { get; set; }

    public Guid UserId { get; set; }
    public AppUser? User { get; set; }

    public int Rating { get; set; }
    public string? Comment { get; set; }
    public bool IsReport { get; set; }

    public DateTime CreatedAt { get; set; }
}
