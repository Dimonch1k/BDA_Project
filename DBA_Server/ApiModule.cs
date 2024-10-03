using Nancy;
using Nancy.ModelBinding;

namespace DBA_Server
{
    public class MyApiModule : NancyModule
    {
        public MyApiModule()
        {
            // Define a route for GET requests
            Get("/api/items", parameters =>
            {
                return Response.AsJson(new[]
                {
                new Item { Id = 1, Name = "Item1" },
                new Item { Id = 2, Name = "Item2" }
            });
            });

            // Define a route for POST requests
            Post("/api/items", parameters =>
            {
                var newItem = this.Bind<Item>();
                return HttpStatusCode.Created; // Return 201 Created
            });
        }
    }
}