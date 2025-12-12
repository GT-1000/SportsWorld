using Microsoft.EntityFrameworkCore;
using SportsWorld.Api.Models;

namespace SportsWorld.Api.Contexts;

public class SportsWorldContext : DbContext
{
    public SportsWorldContext(DbContextOptions<SportsWorldContext> options)
        : base(options)
    {
    }

    public DbSet<Athlete> Athletes { get; set; }
    public DbSet<Finance> Finances { get; set; }
    public DbSet<Venue> Venues { get; set; }
}