using Domain.App.Abstract;
using Domain.Identity;

namespace Domain.App;

public class UserTrailList : Entity
{
    public Guid UserId { get; set; }
    public AppUser? User { get; set; }

    public required string Name { get; set; }
    
    public ICollection<UserTrailListItem> Items { get; set; } = [];
}
