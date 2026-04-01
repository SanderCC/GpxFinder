using Domain.Identity;

namespace Domain.App;

public class TrailDislike
{
    public Guid UserId { get; set; }
    public AppUser? User { get; set; }

    public Guid TrailId { get; set; }
    public Trail? Trail { get; set; }

    public DateTime CreatedAt { get; set; }
}
