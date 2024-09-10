using cafe_employee_management_api.DTOs.Cafe;

namespace cafe_employee_management_api.Services
{
    public interface ICafeService
    {
        Task<IEnumerable<CafeDTO>> GetCafesAsync();
        Task<CafeDTO> GetCafesByIdAsync(Guid id);
        Task CreateCafeAsync(CafeCreateDTO cafeDto);

        Task UpdateCafeAsync(string id, CafeUpdateDTO cafeDto);
        Task DeleteCafeAsync(string id);


    }
}
