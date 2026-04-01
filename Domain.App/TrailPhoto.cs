using Domain.App.Abstract;
using Domain.App.Enums;
using Domain.Identity;

namespace Domain.App;

public class TrailPhoto : Entity
{
    public Guid TrailId { get; set; }
    public Trail? Trail { get; set; }

    public required string PhotoUrl { get; set; }

    public double? Latitude { get; set; }
    public double? Longitude { get; set; }

    public Guid? UploadedByUserId { get; set; }
    public AppUser? UploadedByUser { get; set; }

    public PhotoSource Source { get; set; }
}
