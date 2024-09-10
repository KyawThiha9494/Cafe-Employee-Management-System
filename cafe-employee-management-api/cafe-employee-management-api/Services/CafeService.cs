using cafe_employee_management_api.DB;
using cafe_employee_management_api.DTOs.Cafe;
using cafe_employee_management_api.Models;
using Microsoft.EntityFrameworkCore;

namespace cafe_employee_management_api.Services
{
    public class CafeService : ICafeService
    {
        private readonly AppDbContext _context;

        public CafeService(AppDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<CafeDTO>> GetCafesAsync()
        {
            var query = _context.Cafes
                .Include(c => c.Employees)
                .AsQueryable();

           
            return await query
                .Select(c => new CafeDTO
                {
                    Id = c.Id.ToString(),
                    Name = c.Name,
                    Description = c.Description,
                    Logo = c.Logo,
                    Location = c.Location,
                    Employees = c.Employees.Count
                })
                .OrderByDescending(c => c.Employees)
                .ToListAsync();
        }

        public async Task<CafeDTO> GetCafesByIdAsync(Guid id)
        {
            var cafe = await _context.Cafes
                .Include(c => c.Employees)
                .Where(c => c.Id == id)
                .Select(c => new CafeDTO
                {
                    Id = c.Id.ToString(),
                    Name = c.Name,
                    Description = c.Description,
                    Logo = c.Logo,
                    Location = c.Location,
                    Employees = c.Employees.Count
                })
                .FirstOrDefaultAsync();

            if (cafe == null)
            {
                throw new KeyNotFoundException($"Cafe with ID {id} not found.");
            }

            return cafe;
        }

        public async Task CreateCafeAsync(CafeCreateDTO cafeDto)
        {
            var cafe = new Cafe
            {
                Id = Guid.NewGuid(),
                Name = cafeDto.Name,
                Description = cafeDto.Description,
                Logo = cafeDto.Logo != null ? cafeDto.Logo : "",
                Location = cafeDto.Location
            };

            _context.Cafes.Add(cafe);
            await _context.SaveChangesAsync();
        }

        public async Task UpdateCafeAsync(string id, CafeUpdateDTO cafeDto)
        {
            if (!Guid.TryParse(id, out var cafeGuid))
            {
                throw new Exception("Invalid GUID format for Cafe ID");
            }

            var cafe = await _context.Cafes.FindAsync(cafeGuid);
            if (cafe == null) throw new Exception("Cafe not found");

            cafe.Name = cafeDto.Name;
            cafe.Description = cafeDto.Description;
            cafe.Logo = cafeDto.Logo;
            cafe.Location = cafeDto.Location;

            _context.Cafes.Update(cafe);
            await _context.SaveChangesAsync();
        }

        public async Task DeleteCafeAsync(string id)
        {
            if (!Guid.TryParse(id, out var cafeGuid))
            {
                throw new Exception("Invalid GUID format for Cafe ID");
            }

            var cafe = await _context.Cafes
                .Include(c => c.Employees)
                .FirstOrDefaultAsync(c => c.Id == cafeGuid);

            if (cafe == null) throw new Exception("Cafe not found");

            _context.Employees.RemoveRange(cafe.Employees);

            _context.Cafes.Remove(cafe);
            await _context.SaveChangesAsync();
        }
    }
}
