using cafe_employee_management_api.DB;
using cafe_employee_management_api.DTOs.Employee;
using cafe_employee_management_api.Models;
using Microsoft.EntityFrameworkCore;
using System.Net.Mail;
using System.Reflection;
using System.Xml.Linq;

namespace cafe_employee_management_api.Services
{
    public class EmployeeService : IEmployeeService
    {
        private readonly AppDbContext _context;

        public EmployeeService(AppDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<EmployeeDTO>> GetEmployeesAsync(string? cafeName)
        {
            var query = _context.Employees.AsQueryable();

            if (!string.IsNullOrEmpty(cafeName))
            {
                query = query.Where(e => e.Cafe.Name == cafeName);
            }
            var employees = await query.Include(e => e.Cafe).ToListAsync();

            return employees.Select(e => new EmployeeDTO
            {
                Id = e.Id.ToString(),  
                Name = e.Name,
                EmailAddress = e.EmailAddress,
                PhoneNumber = e.PhoneNumber,
                Gender = e.Gender,
                DaysWorked = (int)(DateTime.Now - e.StartDate).TotalDays,
                CafeId = e.Cafe != null ? e.Cafe.Id.ToString() : string.Empty,
                CafeName = e.Cafe != null ? e.Cafe.Name : string.Empty,
            }).OrderByDescending(e => e.DaysWorked).ToList();
        }

        public async Task<EmployeeDTO> GetEmployeeByIdAsync(Guid id)
        {
            var employee = await _context.Employees
                .Include(e => e.Cafe)
                .FirstOrDefaultAsync(e => e.Id == id);

            if (employee == null) return null;

            return new EmployeeDTO
            {
                Id = employee.Id.ToString(),  
                Name = employee.Name,
                EmailAddress = employee.EmailAddress,
                PhoneNumber = employee.PhoneNumber,
                Gender= employee.Gender,
                DaysWorked = (int)(DateTime.Now - employee.StartDate).TotalDays,
                CafeId = employee.Cafe != null ? employee.Cafe.Id.ToString() : string.Empty,
                CafeName = employee.Cafe != null ? employee.Cafe.Name : string.Empty,
            };
        }

        public async Task<EmployeeDTO> CreateEmployeeAsync(EmployeeCreateDTO employeeDto)
        {
            var cafe = await _context.Cafes.FindAsync(employeeDto.CafeId);

            if (cafe == null) throw new Exception("Cafe not found");

            var employee = new Employee
            {
                Id = Guid.NewGuid(), 
                Name = employeeDto.Name,
                EmailAddress = employeeDto.EmailAddress,
                PhoneNumber = employeeDto.PhoneNumber,
                Gender = employeeDto.Gender,
                StartDate = DateTime.Now,
                CafeId = employeeDto.CafeId
            };

            _context.Employees.Add(employee);
            await _context.SaveChangesAsync();

            return new EmployeeDTO
            {
                Id = employee.Id.ToString(),
                Name = employee.Name,
                EmailAddress = employee.EmailAddress,
                PhoneNumber = employee.PhoneNumber,
                Gender = employee.Gender,
                DaysWorked = (int)(DateTime.Now - employee.StartDate).TotalDays,
                CafeId = cafe.Id.ToString()
            };
        }

        public async Task UpdateEmployeeAsync(Guid id, EmployeeUpdateDTO employeeDto)
        {
            var employee = await _context.Employees.FindAsync(id);

            if (employee == null) throw new Exception("Employee not found");

            var cafe = await _context.Cafes.FindAsync(employeeDto.CafeId);

            if (cafe == null) throw new Exception("Cafe not found");

            employee.Name = employeeDto.Name;
            employee.EmailAddress = employeeDto.EmailAddress;
            employee.PhoneNumber = employeeDto.PhoneNumber;
            employee.Gender= employeeDto.Gender;
            employee.StartDate = employeeDto.StartDate;
            employee.CafeId = employeeDto.CafeId;

            _context.Employees.Update(employee);
            await _context.SaveChangesAsync();
        }

        public async Task DeleteEmployeeAsync(Guid id)
        {
            var employee = await _context.Employees.FindAsync(id);

            if (employee == null) throw new Exception("Employee not found");

            _context.Employees.Remove(employee);
            await _context.SaveChangesAsync();
        }

        public async Task<IEnumerable<EmployeeDTO>> GetEmployeeByCafeIdAsync(Guid id)
        {
            var query = _context.Employees.AsQueryable();

            if (id != null)
            {
                query = query.Where(e => e.Cafe.Id == id);
            }
            var employees = await query.Include(e => e.Cafe).ToListAsync();

            return employees.Select(e => new EmployeeDTO
            {
                Id = e.Id.ToString(),
                Name = e.Name,
                EmailAddress = e.EmailAddress,
                PhoneNumber = e.PhoneNumber,
                Gender = e.Gender,
                DaysWorked = (int)(DateTime.Now - e.StartDate).TotalDays,
                CafeId = e.Cafe != null ? e.Cafe.Id.ToString() : string.Empty,
                CafeName = e.Cafe != null ? e.Cafe.Name : string.Empty,
            }).OrderByDescending(e => e.DaysWorked).ToList();

        }
    }
}
