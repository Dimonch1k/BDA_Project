using Nancy;
using Dapper;
using System.Threading.Tasks;
using System.Linq;
using eLibrary.Models;
using Nancy.ModelBinding;

public class UserModule : NancyModule
{
    private readonly Database _database;

    public UserModule(Database database)
    {
        _database = database;

        Post("/api/register", async (args) => await Register());
        Post("/api/login", async (args) => await Login());
    }

    private async Task<object> Register()
    {
        var user = this.Bind<User>();
        using (var db = _database.Connection)
        {
            db.Open();
            var existingUser = await db.QuerySingleOrDefaultAsync<User>("SELECT * FROM users " +
                "WHERE email = @Email", new { user.Email });
            if (existingUser != null) return HttpStatusCode.BadRequest;

            var result = await db.ExecuteAsync("INSERT INTO users (name, email, password_hash) " +
                "VALUES (@Name, @Email, @PasswordHash)", user);
            return result > 0 ? HttpStatusCode.Created : HttpStatusCode.InternalServerError;
        }
    }

    private async Task<object> Login()
    {
        var user = this.Bind<User>();
        using (var db = _database.Connection)
        {
            db.Open();
            var existingUser = await db.QuerySingleOrDefaultAsync<User>("SELECT * FROM users " +
                "WHERE email = @Email", new { user.Email });
            if (existingUser == null || existingUser.Password != user.Password) 
                return HttpStatusCode.Unauthorized;

            return existingUser;
        }
    }
}