namespace Domain.App;

public class UserTrailListItem
{
    public Guid ListId { get; set; }
    public UserTrailList? List { get; set; }

    public Guid TrailId { get; set; }
    public Trail? Trail { get; set; }

    public DateTime AddedAt { get; set; }
}
