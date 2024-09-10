namespace cafe_employee_management_api.DTOs.Cafe
{
    public class CafeCreateDTO
    {
        public string Name { get; set; }
        public string Description { get; set; }
        public string? Logo { get; set; }
        public string Location { get; set; }
    }
}
