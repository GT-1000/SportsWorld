using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SportsWorld.Api.Contexts;
using SportsWorld.Api.Models;

namespace SportsWorld.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class AthletesController : ControllerBase
{
    private readonly SportsWorldContext _context;

    public AthletesController(SportsWorldContext context)
    {
        _context = context;
    }

    // GET: api/athletes
    [HttpGet]
    public async Task<ActionResult<IEnumerable<Athlete>>> GetAthletes()
    {
        return await _context.Athletes.ToListAsync();
    }

    // GET: api/athletes/search?name=Messi
    [HttpGet("search")]
    public async Task<ActionResult<IEnumerable<Athlete>>> SearchAthletes(string name)
    {
        if (string.IsNullOrWhiteSpace(name))
            return await _context.Athletes.ToListAsync();

        return await _context.Athletes
            .Where(a => a.Name.ToLower().Contains(name.ToLower()))
            .ToListAsync();
    }

    // GET: api/athletes/notpurchased
    [HttpGet("notpurchased")]
    public async Task<ActionResult<IEnumerable<Athlete>>> GetNotPurchased()
    {
        return await _context.Athletes
            .Where(a => a.PurchaseStatus == false)
            .ToListAsync();
    }

    // POST: api/athletes
    [HttpPost]
    public async Task<ActionResult<Athlete>> CreateAthlete(Athlete athlete)
    {
        _context.Athletes.Add(athlete);
        await _context.SaveChangesAsync();

        return CreatedAtAction(nameof(GetAthleteById), new { id = athlete.Id }, athlete);
    }

    // GET: api/athletes/{id}
    [HttpGet("{id}")]
    public async Task<ActionResult<Athlete>> GetAthleteById(int id)
    {
        var athlete = await _context.Athletes.FindAsync(id);

        if (athlete == null)
            return NotFound();

        return athlete;
    }

    // DELETE: api/athletes/{id}
    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteAthlete(int id)
    {
        var athlete = await _context.Athletes.FindAsync(id);
        if (athlete == null)
            return NotFound();

        _context.Athletes.Remove(athlete);
        await _context.SaveChangesAsync();

        return NoContent();
    }

    // PUT: api/athletes/{id}
    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateAthlete(int id, Athlete updatedAthlete)
    {
        if (id != updatedAthlete.Id)
            return BadRequest();

        var athlete = await _context.Athletes.FindAsync(id);
        if (athlete == null)
            return NotFound();

        athlete.Name = updatedAthlete.Name;
        athlete.Gender = updatedAthlete.Gender;
        athlete.Price = updatedAthlete.Price;
        athlete.Image = updatedAthlete.Image;
        athlete.PurchaseStatus = updatedAthlete.PurchaseStatus;

        await _context.SaveChangesAsync();

        return NoContent();
    }
}