using Domain.App;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace DAL.Core.Configurations;

public sealed class UserTrailListItemConfiguration : IEntityTypeConfiguration<UserTrailListItem>
{
    public void Configure(EntityTypeBuilder<UserTrailListItem> builder)
    {
        builder.HasKey(i => new { i.ListId, i.TrailId });
    }
}
