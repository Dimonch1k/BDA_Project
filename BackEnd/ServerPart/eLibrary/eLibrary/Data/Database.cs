
using MySql.Data.MySqlClient;
using System.Data;

public class Database
{
    private readonly string connectionString;

    public Database(string connectionString)
    {
        this.connectionString = connectionString;
    }

    public IDbConnection Connection => new MySqlConnection(connectionString);
}
