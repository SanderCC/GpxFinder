using Domain.Identity;

namespace Domain.App;

public class UserFavorite
{
    public Guid UserId { get; set; }
    public AppUser? User { get; set; }

    public int TrailId { get; set; }
    public Trail? Trail { get; set; }

    public DateTime CreatedAt { get; set; }
}
