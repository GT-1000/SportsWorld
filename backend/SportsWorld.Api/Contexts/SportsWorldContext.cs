using Microsoft.EntityFrameworkCore;
using SportsWorld.Api.Models;

namespace SportsWorld.Api.Contexts;

public class SportsWorldContext : DbContext
{
    public SportsWorldContext(DbContextOptions<SportsWorldContext> options)
        : base(options)
    {
    }

    public DbSet<Athlete> Athletes => Set<Athlete>();
}