using InterviewTest.Server.Model;

public interface IEmployeeRepository
{
    List<Employee> GetAll();
    Employee Insert(Employee employee);
    bool Update(Employee employee);
    bool Delete(int id);
    void IncrementValues();
    List<EmployeeSum> GetEmployeeSums();
}