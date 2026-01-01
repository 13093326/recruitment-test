using InterviewTest.Server.Model;

namespace InterviewTest.Server.Data
{
    public class EmployeeRepository : IEmployeeRepository
    {
        private readonly IDbConnectionProvider connectionFactory;

        public EmployeeRepository(IDbConnectionProvider connectionFactory)
        {
            this.connectionFactory = connectionFactory;
        }

        public List<Employee> GetAll()
        {
            using var connection = connectionFactory.CreateConnection();

            var cmd = connection.CreateCommand();
            cmd.CommandText = "SELECT Id, Name, Value FROM Employees";

            var employees = new List<Employee>();
            using var reader = cmd.ExecuteReader();
            while (reader.Read())
            {
                employees.Add(new Employee
                {
                    Id = reader.GetInt32(0),
                    Name = reader.GetString(1),
                    Value = reader.GetInt32(2)
                });
            }

            return employees;
        }

        public bool Delete(int id)
        {
            using var connection = connectionFactory.CreateConnection();

            var cmd = connection.CreateCommand();
            cmd.CommandText = "DELETE FROM Employees WHERE Id = $id";
            var param = cmd.CreateParameter();
            param.ParameterName = "$id";
            param.Value = id;
            cmd.Parameters.Add(param);

            return cmd.ExecuteNonQuery() > 0;
        }

        public bool Update(Employee employee)
        {
            using var connection = connectionFactory.CreateConnection();

            var cmd = connection.CreateCommand();
            cmd.CommandText = @"
                UPDATE Employees
                SET Name = $name, Value = $value
                WHERE Id = $id
                ";

            var nameParam = cmd.CreateParameter();
            nameParam.ParameterName = "$name";
            nameParam.Value = employee.Name;
            cmd.Parameters.Add(nameParam);

            var valueParam = cmd.CreateParameter();
            valueParam.ParameterName = "$value";
            valueParam.Value = employee.Value;
            cmd.Parameters.Add(valueParam);

            var idParam = cmd.CreateParameter();
            idParam.ParameterName = "$id";
            idParam.Value = employee.Id;
            cmd.Parameters.Add(idParam);

            return cmd.ExecuteNonQuery() > 0;
        }

        public Employee Insert(Employee employee)
        {
            using var connection = connectionFactory.CreateConnection();

            var cmd = connection.CreateCommand();
            cmd.CommandText = @"
                            INSERT INTO Employees (Name, Value)
                            VALUES ($name, $value)
                            RETURNING Id, Name, Value;
                        ";

            var nameParam = cmd.CreateParameter();
            nameParam.ParameterName = "$name";
            nameParam.Value = employee.Name;
            cmd.Parameters.Add(nameParam);

            var valueParam = cmd.CreateParameter();
            valueParam.ParameterName = "$value";
            valueParam.Value = employee.Value;
            cmd.Parameters.Add(valueParam);

            using var reader = cmd.ExecuteReader();
            reader.Read();

            return new Employee
            {
                Id = reader.GetInt32(0),
                Name = reader.GetString(1),
                Value = reader.GetInt32(2)
            };
        }

        public void IncrementValues()
        {
            using var connection = connectionFactory.CreateConnection();

            var updateCmd = connection.CreateCommand();
            updateCmd.CommandText = @"
                                    UPDATE Employees
                                    SET Value = CASE
                                        WHEN Name LIKE 'E%' THEN Value + 1
                                        WHEN Name LIKE 'G%' THEN Value + 10
                                        ELSE Value + 100
                                    END
                                ";

            updateCmd.ExecuteNonQuery();
        }

        public List<EmployeeSum> GetEmployeeSums()
        {
            using var connection = connectionFactory.CreateConnection();

            var employeeSums = new List<EmployeeSum>();
            var cmd = connection.CreateCommand();
            cmd.CommandText = @"
                SELECT SUBSTR(Name, 1, 1), SUM(Value)
                FROM Employees
                WHERE Name LIKE 'A%' OR Name LIKE 'B%' OR Name LIKE 'C%'
                GROUP BY SUBSTR(Name, 1, 1)
                HAVING SUM(Value) >= 11171
                ";

            using var reader = cmd.ExecuteReader();
            while (reader.Read())
            {
                employeeSums.Add(new EmployeeSum
                {
                    Group = reader.GetString(0),
                    TotalValue = reader.GetInt32(1)
                });
            }

            return employeeSums;
        }
    }
}
