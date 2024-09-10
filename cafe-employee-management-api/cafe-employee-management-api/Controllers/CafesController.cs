using cafe_employee_management_api.DTOs.Cafe;
using cafe_employee_management_api.Services;
using Microsoft.AspNetCore.Mvc;

[ApiController]
[Route("api/[controller]/[action]")]
public class CafesController : ControllerBase
{
    private readonly ICafeService _cafeService;

    public CafesController(ICafeService cafeService)
    {
        _cafeService = cafeService;
    }

    [HttpGet]
    public async Task<IActionResult> GetCafes([FromQuery] string? id)
    {
        var cafes = await _cafeService.GetCafesAsync();
        return Ok(cafes);
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetCafe(string id)
    {

        if (!Guid.TryParse(id, out var cafeId))
        {
            return BadRequest("Invalid ID format.");
        }

        var cafe = await _cafeService.GetCafesByIdAsync(cafeId);
        if (cafe == null) return NotFound();

        return Ok(cafe);
    }


    [HttpPost]
    public async Task<IActionResult> CreateCafe([FromBody] CafeCreateDTO cafeDto)
    {
        await _cafeService.CreateCafeAsync(cafeDto);
        
        return CreatedAtAction(nameof(GetCafes), new { location = cafeDto.Location }, cafeDto);
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateCafe(string id, [FromBody] CafeUpdateDTO cafeDto)
    {
        await _cafeService.UpdateCafeAsync(id, cafeDto);
        return NoContent();
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteCafe(string id)
    {
        await _cafeService.DeleteCafeAsync(id);
        return NoContent();
    }
}
