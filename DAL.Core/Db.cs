using Domain.App;
using Domain.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace DAL.Core;

public abstract class Db : IdentityDbContext<AppUser, AppRole, Guid>
{
    public DbSet<Trail> Trails => Set<Trail>();
    public DbSet<TrailPhoto> TrailPhotos => Set<TrailPhoto>();
    public DbSet<TrailReview> TrailReviews => Set<TrailReview>();
    public DbSet<UserFavorite> UserFavorites => Set<UserFavorite>();
    public DbSet<UserTrailList> UserTrailLists => Set<UserTrailList>();
    public DbSet<UserTrailListItem> UserTrailListItems => Set<UserTrailListItem>();

    protected override void OnModelCreating(ModelBuilder builder)
    {
        base.OnModelCreating(builder);

        builder.ApplyConfigurationsFromAssembly(typeof(Db).Assembly);
    }
}
