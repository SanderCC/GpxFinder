using Domain.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;

namespace DAL.Core;

public abstract class AppContext : IdentityDbContext<AppUser, AppRole, Guid>
{
    
}