using Microsoft.AspNetCore.Mvc;

namespace SportsWorld.Api.Controllers;

[ApiController]
[Route("api/[controller]")]

public class ImageUploadController(
        IWebHostEnvironment webHostEnvironment
    ) : ControllerBase
{
    [HttpPost]
    public async Task<IActionResult> Post(IFormFile file)
    {
        try
        {
            if (file == null || file.Length == 0)
            return BadRequest("No file uploaded");

            string webRootPath = webHostEnvironment.WebRootPath;
            string imagesFolder = Path.Combine(webRootPath, "images");

            if(!Directory.Exists(imagesFolder))
            Directory.CreateDirectory(imagesFolder);

            string fileName = Guid.NewGuid().ToString() + Path.GetExtension(file.FileName);
            string absolutePath = Path.Combine(imagesFolder, fileName);

            using (var fileStream = new FileStream(absolutePath, FileMode.Create))
            {
                await file.CopyToAsync(fileStream);
            }

            string imageUrl = $"{Request.Scheme}://{Request.Host}/images/{fileName}";
            return Ok(new {imageUrl});
        }
        catch
        {
            return StatusCode(500);
        }
    }
}