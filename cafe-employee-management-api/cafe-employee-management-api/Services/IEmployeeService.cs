using cafe_employee_management_api.DTOs.Employee;

namespace cafe_employee_management_api.Services
{
    public interface IEmployeeService
    {
        Task<IEnumerable<EmployeeDTO>> GetEmployeesAsync(string cafeName);
        Task<EmployeeDTO> GetEmployeeByIdAsync(Guid id);

        Task<IEnumerable<EmployeeDTO>> GetEmployeeByCafeIdAsync(Guid id);
        Task<EmployeeDTO> CreateEmployeeAsync(EmployeeCreateDTO employeeDto);
        Task UpdateEmployeeAsync(Guid id, EmployeeUpdateDTO employeeDto);
        Task DeleteEmployeeAsync(Guid id);
    }
}
