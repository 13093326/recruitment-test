using Microsoft.Data.Sqlite;
using System.Data;

namespace InterviewTest.Server.Data
{
    public class SqliteConnectionProvider : IDbConnectionProvider
    {
        private readonly string connectionString;

        public SqliteConnectionProvider(string databasePath)
        {
            var builder = new SqliteConnectionStringBuilder
            {
                DataSource = databasePath
            };
            connectionString = builder.ConnectionString;
        }

        public IDbConnection CreateConnection()
        {
            var connection = new SqliteConnection(connectionString);
            connection.Open();
            return connection;
        }
    }
}
