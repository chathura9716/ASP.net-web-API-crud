using FullStack.API.Data;
using FullStack.API.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace FullStack.API.Controllers
{
    [ApiController]
    [Route("/api/[controller]")]

    public class EmployeesController : Controller
    {
        private readonly FullStackDbContext _fullStackDbContext;
        public EmployeesController(FullStackDbContext fullStackDbContext)
        {
            _fullStackDbContext = fullStackDbContext;     
        }
        [HttpGet]
        public async Task<IActionResult> GetAllEmployees()
        {
          var employees=await _fullStackDbContext.Employees.ToListAsync();
            return Ok(employees);
        }

        [HttpPost]
        public async Task<IActionResult> AddEmployee([FromBody]Employee employeeRequest)
        {
            employeeRequest.Id =Guid.NewGuid(); 
            await _fullStackDbContext.Employees.AddAsync(employeeRequest);
            await _fullStackDbContext.SaveChangesAsync();
            return Ok(employeeRequest);
        }
        [HttpPut]
        [Route("{id:Guid}")]
        public async Task<IActionResult> UpdateEmployees([FromRoute] Guid id, Employee UpdateEmployeeRequest)
        {
            var employee = await _fullStackDbContext.Employees.FindAsync(id);
            if (employee == null) {
                return NotFound();
            }
            Console.WriteLine($"Received data: Id = {id}");
            // Console.WriteLine($"Received data: Name = {UpdateEmployeeRequest.Name}, Email = {UpdateEmployeeRequest.Email}, Salary = {UpdateEmployeeRequest.Salary}, Phone = {UpdateEmployeeRequest.Phone}, Department = {UpdateEmployeeRequest.Department}");
            employee.Name = UpdateEmployeeRequest.Name;
            employee.Email = UpdateEmployeeRequest.Email;
            employee.Salary = UpdateEmployeeRequest.Salary; 
            employee.Phone = UpdateEmployeeRequest.Phone;  
            employee.Department = UpdateEmployeeRequest.Department; 
            await _fullStackDbContext.SaveChangesAsync();   
            return Ok(employee);
        }
        [HttpDelete]
        [Route("{id:Guid}")]
        public async Task<IActionResult> DeleteEmployees([FromRoute] Guid id)
        {
            var employee = await _fullStackDbContext.Employees.FindAsync(id);
            if (employee == null)
            {
                return NotFound();
            }
            _fullStackDbContext.Employees.Remove(employee);
            await _fullStackDbContext.SaveChangesAsync();
            return Ok(employee);
        }
    }
}
