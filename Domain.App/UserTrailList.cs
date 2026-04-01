using Domain.Identity;

namespace Domain.App;

public class UserTrailList
{
    public int Id { get; set; }

    public Guid UserId { get; set; }
    public AppUser? User { get; set; }

    public required string Name { get; set; }

    public DateTime CreatedAt { get; set; }

    public ICollection<UserTrailListItem> Items { get; set; } = [];
}
