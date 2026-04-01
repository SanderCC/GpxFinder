using Domain.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;

namespace DAL.Core;

public abstract class Db : IdentityDbContext<AppUser, AppRole, Guid>
{
    
}