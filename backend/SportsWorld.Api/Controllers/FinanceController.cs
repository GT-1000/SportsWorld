using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SportsWorld.Api.Contexts;
using SportsWorld.Api.Models;

namespace SportsWorld.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class FinanceController : ControllerBase
{
    private readonly SportsWorldContext _context;

    public FinanceController(SportsWorldContext context)
    {
        _context = context;
    }

[HttpGet]
public async Task<ActionResult<Finance>> GetFinance()
{
    var finance = await _context.Finances.FirstOrDefaultAsync();

    if (finance == null)
    {
        finance = new Finance
        {
            MoneyLeft = 10_000_000,
            MoneySpent = 0,
            NumberOfPurchases = 0
        };

        _context.Finances.Add(finance);
        await _context.SaveChangesAsync();
    }

    return Ok(finance);
}

[HttpPut("loan")]
public async Task<IActionResult> AddLoan([FromBody] decimal amount)
{
    try
    {
        if (amount <= 0)
        {
            return BadRequest("Invalid loan amount");
        }

        var finance = await _context.Finances.FirstOrDefaultAsync();

        if (finance == null)
        {
            return NotFound();
        }

        finance.MoneyLeft += amount;
        await _context.SaveChangesAsync();

        return NoContent();
    }
    catch
    {
        return StatusCode(500);
    }
}

}