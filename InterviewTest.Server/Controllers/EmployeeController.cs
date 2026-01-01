using InterviewTest.Server.Model;
using Microsoft.AspNetCore.Mvc;

namespace InterviewTest.Server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class EmployeeController : ControllerBase
    {
        private readonly IEmployeeRepository employeeRepository;

        public EmployeeController(IEmployeeRepository employeeRepository)
        {
            this.employeeRepository = employeeRepository;
        }

        [HttpGet]
        public ActionResult<List<Employee>> Get()
        {
            var employees = employeeRepository.GetAll();
            return Ok(employees);
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            var deleted = employeeRepository.Delete(id);
            return deleted ? StatusCode((int)System.Net.HttpStatusCode.NoContent) : NotFound();
        }

        [HttpPut]
        public IActionResult Put([FromBody] Employee employee)
        {
            var updated = employeeRepository.Update(employee);
            return updated ? Ok(employee) : NotFound();
        }

        [HttpPost]
        public IActionResult Post([FromBody] Employee employee)
        {
            var added = employeeRepository.Insert(employee);
            return Ok(added);
        }

        [HttpPut("increment")]
        public IActionResult Increment()
        {
            employeeRepository.IncrementValues();
            return NoContent();
        }

        [HttpGet("sum-abc")]
        public IActionResult GetEmployeeSums()
        {
            var employeeSums = employeeRepository.GetEmployeeSums();
            return Ok(employeeSums);
        }
    }
}
