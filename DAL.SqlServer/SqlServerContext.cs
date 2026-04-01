using DAL.Core;
using Microsoft.EntityFrameworkCore;

namespace DAL.SqlServer;

public sealed class SqlServerContext : Db
{
    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
        base.OnConfiguring(optionsBuilder);
        optionsBuilder.UseSqlServer(
            "Server=.;Database=TrailDb;Trusted_Connection=True;TrustServerCertificate=True;",
            x => x.UseNetTopologySuite());
    }
}