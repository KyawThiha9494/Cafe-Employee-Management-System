using cafe_employee_management_api.DTOs.Employee;
using cafe_employee_management_api.Services;
using Microsoft.AspNetCore.Mvc;

[ApiController]
[Route("api/[controller]/[action]")]
public class EmployeeController : ControllerBase
{
    private readonly IEmployeeService _employeeService;

    public EmployeeController(IEmployeeService employeeService)
    {
        _employeeService = employeeService;
    }

    [HttpGet]
    public async Task<IActionResult> GetEmployees([FromQuery] string? cafe)
    {
        var employees = await _employeeService.GetEmployeesAsync(cafe);
        return Ok(employees);
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetEmployee(string id)
    {
       
        if (!Guid.TryParse(id, out var employeeId))
        {
            return BadRequest("Invalid ID format.");
        }

        var employee = await _employeeService.GetEmployeeByIdAsync(employeeId);
        if (employee == null) return NotFound();

        return Ok(employee);
    }

    [HttpGet("{cafeId}")]
    public async Task<IActionResult> GetEmployeeByCafeId(string cafeId)
    {

        if (!Guid.TryParse(cafeId, out var parseCafeId))
        {
            return BadRequest("Invalid ID format.");
        }

        var employees = await _employeeService.GetEmployeeByCafeIdAsync(parseCafeId);
        if (employees == null || !employees.Any()) return NotFound();

        return Ok(employees);
    }

    [HttpPost]
    public async Task<IActionResult> CreateEmployee([FromBody] EmployeeCreateDTO employeeDto)
    {
        var employee = await _employeeService.CreateEmployeeAsync(employeeDto);
        return CreatedAtAction(nameof(GetEmployee), new { id = employee.Id }, employee);
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateEmployee(string id, [FromBody] EmployeeUpdateDTO employeeDto)
    {
      
        if (!Guid.TryParse(id, out var employeeId))
        {
            return BadRequest("Invalid ID format.");
        }

        await _employeeService.UpdateEmployeeAsync(employeeId, employeeDto);
        return NoContent();
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteEmployee(string id)
    {
     
        if (!Guid.TryParse(id, out var employeeId))
        {
            return BadRequest("Invalid ID format.");
        }

        await _employeeService.DeleteEmployeeAsync(employeeId);
        return NoContent();
    }
}
