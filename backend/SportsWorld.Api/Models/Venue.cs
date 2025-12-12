namespace SportsWorld.Api.Models;

public class Venue
{
    public int Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public int Capacity { get; set; }
    public string Image { get; set; } = string.Empty;
}