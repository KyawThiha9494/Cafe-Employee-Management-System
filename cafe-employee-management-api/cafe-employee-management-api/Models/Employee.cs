namespace cafe_employee_management_api.Models
{
    public class Employee
    {
        public Guid Id { get; set; } 
        public string Name { get; set; }
        public string EmailAddress { get; set; }
        public string PhoneNumber { get; set; } 
        public string Gender { get; set; } 
        public DateTime StartDate { get; set; } 
        public Guid CafeId { get; set; }
        public Cafe Cafe { get; set; }
    }
}
