namespace cafe_employee_management_api.DTOs.Cafe
{
    public class CafeDTO
    {
        public string Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public string? Logo { get; set; }
        public string Location { get; set; }
        public int? Employees { get; set; }
    }
}
