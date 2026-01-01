using System.Data;

namespace InterviewTest.Server.Data
{
    public interface IDbConnectionProvider
    {
        IDbConnection CreateConnection();
    }
}