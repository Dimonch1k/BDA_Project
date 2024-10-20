using System;
using Nancy;
using Nancy.Hosting.Self;
using Nancy.TinyIoc;
using Microsoft.Extensions.Logging;
using ConsoleApp1.Repository;
using ConsoleApp1.Service;
using ConsoleApp1.Modules;
using ConsoleApp1.Entity;
using Serilog.Core;
using System.Reflection;
using System.Security.Cryptography.X509Certificates;

namespace ConsoleApp1
{
    public class Bootstrapper : DefaultNancyBootstrapper
    {
        protected override void ConfigureApplicationContainer(TinyIoCContainer container)
        {
            base.ConfigureApplicationContainer(container);

            // Connection string for MySQL database
            var connectionString = "Server=localhost;Database=elibrary;User ID=root;Password=pass;Port=3306;";

            // Create a logger factory
            var loggerFactory = LoggerFactory.Create(builder =>
            {
                builder.AddConsole(); 
            });

            // Register repositories with their respective loggers
            container.Register<IPostRepository>(new PostRepository(connectionString, loggerFactory.CreateLogger<PostRepository>()));
            container.Register<IUserRepository>(new UserRepository(connectionString, loggerFactory.CreateLogger<UserRepository>()));
            container.Register<IBookRepository>(new BookRepository(connectionString, loggerFactory.CreateLogger<BookRepository>()));
            container.Register<ILoanRepository>(new LoanRepository(connectionString, loggerFactory.CreateLogger<LoanRepository>()));
            container.Register<IReviewRepository>(new ReviewRepository(connectionString, loggerFactory.CreateLogger<ReviewRepository>()));

            // Register services with their respective loggers
            container.Register<IPostService>(new PostService(
                container.Resolve<IPostRepository>(),
            container.Resolve<IUserRepository>(),
                loggerFactory.CreateLogger<PostService>())); 

            container.Register<IUserService>(new UserService(
                container.Resolve<IUserRepository>(),
                loggerFactory.CreateLogger<UserService>())); 

            container.Register<IBookService>(new BookService(
                container.Resolve<IBookRepository>(),
                container.Resolve<IUserRepository>(),
                loggerFactory.CreateLogger<BookService>())); 

            // Register LoanService with its logger
            container.Register<ILoanService>(new LoanService(
                container.Resolve<ILoanRepository>(),
                loggerFactory.CreateLogger<LoanService>())); 

            container.Register<IReviewService>(new ReviewService(
                container.Resolve<IReviewRepository>(),
                loggerFactory.CreateLogger<ReviewService>())); 

            // Register modules with their respective loggers
            container.Register<ILogger<BookModule>>(loggerFactory.CreateLogger<BookModule>());
            container.Register<ILogger<LoanModule>>(loggerFactory.CreateLogger<LoanModule>()); 
            container.Register<ILogger<PostModule>>(loggerFactory.CreateLogger<PostModule>()); 
            container.Register<ILogger<ReviewModule>>(loggerFactory.CreateLogger<ReviewModule>()); 
            container.Register<ILogger<UserModule>>(loggerFactory.CreateLogger<UserModule>()); 
        }
    }

    public class Program
    {
        public static void Main(string[] args)
        {
            var certificate = new X509Certificate2("/etc/ssl/certs/apache-selfsigned.crt");
            // Start Nancy application
            HostConfiguration config = new HostConfiguration
            {
                RewriteLocalhost = true,
            };

            using (var host = new NancyHost(config, new Uri("https://0.0.0.0:5000")))
            {
                AddCertificateToHttpsListener("https://0.0.0.0:5000", certificate);

                host.Start();
                Console.WriteLine("Nancy running on https://0.0.0.0:5000");
                Console.ReadLine();
            }
        }

        private static void AddCertificateToHttpsListener(string uriPrefix, X509Certificate2 certificate)
        {

            string certificateThumbprint = certificate.Thumbprint;

        }
    }



    
}
