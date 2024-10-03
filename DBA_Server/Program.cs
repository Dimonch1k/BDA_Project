using Nancy.Hosting.Self;

namespace DBA_Server
{
    class Program
    {
        static void Main(string[] args)
        {
            //var hostConfig = new HostConfiguration
            //{
            //    RewriteLocalhost = true
            //};

            using (var host = new NancyHost(new Uri("http://localhost:3000")))
            {
                host.Start(); // Start the Nancy host
                Console.WriteLine("NancyFX is running on http://localhost:1234");
                Console.WriteLine("Press any key to stop...");
                Console.ReadKey(); // Keep the application running until a key is pressed
            }
        }
    }
}