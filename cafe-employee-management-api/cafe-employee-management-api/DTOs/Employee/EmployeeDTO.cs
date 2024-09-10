namespace cafe_employee_management_api.DTOs.Employee
{
    public class EmployeeDTO
    {
        public string Id { get; set; }
        public string Name { get; set; }
        public string EmailAddress { get; set; }
        public string PhoneNumber { get; set; }
        public string Gender { get; set; }
        public int DaysWorked { get; set; }
        public string CafeId { get; set; }
        public string CafeName { get; set; }
    }
}
