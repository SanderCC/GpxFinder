namespace Domain.App;

public class UserTrailListItem
{
    public int ListId { get; set; }
    public UserTrailList? List { get; set; }

    public int TrailId { get; set; }
    public Trail? Trail { get; set; }

    public DateTime AddedAt { get; set; }
}
