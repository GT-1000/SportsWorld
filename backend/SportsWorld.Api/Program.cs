using Microsoft.EntityFrameworkCore;
using SportsWorld.Api.Contexts;

var builder = WebApplication.CreateBuilder(args);

// Add services
builder.Services.AddControllers();

// Database (SQLite)
builder.Services.AddDbContext<SportsWorldContext>(options =>
    options.UseSqlite(builder.Configuration.GetConnectionString("DefaultConnection"))
);

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Middleware
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseStaticFiles();
app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();