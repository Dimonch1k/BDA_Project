using ConsoleApp1.Entity;
using ConsoleApp1.Service;
using Microsoft.Extensions.Logging;
using Nancy;
using Nancy.ModelBinding;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace ConsoleApp1.Modules
{
    public class BookModule : NancyModule
    {
        private readonly IBookService _bookService;
        private readonly ILogger<BookModule> _logger; 

        public BookModule(IBookService bookService, ILogger<BookModule> logger) : base("/api/books")
        {
            _bookService = bookService;
            _logger = logger;

            // Create a book
            Post("/", parameters =>
            {
                _logger.LogInformation("Request to create a new book.");
                var book = this.Bind<Book>();

                // Model validation
                var validationErrors = ValidateBook(book);
                if (validationErrors.Count > 0)
                {
                    _logger.LogWarning("Validation error when creating book: {Errors}", string.Join(", ", validationErrors));
                    return Response.AsJson(new { errors = validationErrors }, HttpStatusCode.BadRequest);
                }

                try
                {
                    _bookService.AddBook(book);
                    _logger.LogInformation("Book '{Title}' successfully created.", book.Title);
                    return Response.AsJson(book, HttpStatusCode.Created);
                }
                catch (InvalidOperationException ex)
                {
                    _logger.LogError(ex, "Conflict while creating book '{Title}'", book.Title);
                    return Response.AsJson(new { message = ex.Message }, HttpStatusCode.Conflict);
                }
                catch (ArgumentException ex)
                {
                    _logger.LogError(ex, "Invalid data when creating book '{Title}'", book.Title);
                    return Response.AsJson(new { message = ex.Message }, HttpStatusCode.BadRequest);
                }
                catch (Exception ex)
                {
                    _logger.LogError(ex, "Error while creating book '{Title}'", book.Title);
                    return Response.AsJson(new { message = "An error occurred while creating the book.", details = ex.Message }, HttpStatusCode.InternalServerError);
                }
            });

            // Get all books
            Get("/", parameters =>
            {
                _logger.LogInformation("Request to retrieve all books.");
                try
                {
                    var books = _bookService.GetAllBooks();
                    _logger.LogInformation("Books retrieved successfully.");
                    return Response.AsJson(books, HttpStatusCode.OK);
                }
                catch (Exception ex)
                {
                    _logger.LogError(ex, "Error while retrieving books.");
                    return Response.AsJson(new { message = "An error occurred while retrieving books.", details = ex.Message }, HttpStatusCode.InternalServerError);
                }
            });

            // Get a book by ID
            Get("/{id:int}", parameters =>
            {
                int id = parameters.id;
                _logger.LogInformation("Request to retrieve book with ID {Id}", id);
                try
                {
                    var book = _bookService.GetBookById(id);
                    if (book == null)
                    {
                        _logger.LogWarning("Book with ID {Id} not found.", id);
                        return Response.AsJson(new { message = "Book not found." }, HttpStatusCode.NotFound);
                    }
                    _logger.LogInformation("Book with ID {Id} retrieved successfully.", id);
                    return Response.AsJson(book, HttpStatusCode.OK);
                }
                catch (ArgumentException ex)
                {
                    _logger.LogError(ex, "Invalid request to retrieve book with ID {Id}", id);
                    return Response.AsJson(new { message = ex.Message }, HttpStatusCode.BadRequest);
                }
                catch (Exception ex)
                {
                    _logger.LogError(ex, "Error while retrieving book with ID {Id}", id);
                    return Response.AsJson(new { message = "An error occurred while retrieving the book.", details = ex.Message }, HttpStatusCode.InternalServerError);
                }
            });

            // Delete a book by ID
            Delete("/{id:int}", parameters =>
            {
                int id = parameters.id;
                _logger.LogInformation("Request to delete book with ID {Id}", id);
                try
                {
                    _bookService.DeleteBook(id);
                    _logger.LogInformation("Book with ID {Id} successfully deleted.", id);
                    return HttpStatusCode.NoContent;
                }
                catch (ArgumentException ex)
                {
                    _logger.LogError(ex, "Invalid request to delete book with ID {Id}", id);
                    return Response.AsJson(new { message = ex.Message }, HttpStatusCode.BadRequest);
                }
                catch (Exception ex)
                {
                    _logger.LogError(ex, "Error while deleting book with ID {Id}", id);
                    return Response.AsJson(new { message = "An error occurred while deleting the book.", details = ex.Message }, HttpStatusCode.InternalServerError);
                }
            });

            // Update a book by ID
            Put("/{id:int}", parameters =>
            {
                int id = parameters.id;
                _logger.LogInformation("Request to update book with ID {Id}", id);
                var updatedBook = this.Bind<Book>();

                // Model validation
                var validationErrors = ValidateBook(updatedBook);
                if (validationErrors.Count > 0)
                {
                    _logger.LogWarning("Validation error when updating book with ID {Id}: {Errors}", id, string.Join(", ", validationErrors));
                    return Response.AsJson(new { errors = validationErrors }, HttpStatusCode.BadRequest);
                }

                try
                {
                    updatedBook.Id = id;
                    _bookService.UpdateBook(updatedBook);
                    _logger.LogInformation("Book with ID {Id} successfully updated.", id);
                    return Response.AsJson(updatedBook, HttpStatusCode.OK);
                }
                catch (InvalidOperationException ex)
                {
                    _logger.LogError(ex, "Conflict while updating book with ID {Id}", id);
                    return Response.AsJson(new { message = ex.Message }, HttpStatusCode.Conflict);
                }
                catch (ArgumentException ex)
                {
                    _logger.LogError(ex, "Invalid request to update book with ID {Id}", id);
                    return Response.AsJson(new { message = ex.Message }, HttpStatusCode.BadRequest);
                }
                catch (Exception ex)
                {
                    _logger.LogError(ex, "Error while updating book with ID {Id}", id);
                    return Response.AsJson(new { message = "An error occurred while updating the book.", details = ex.Message }, HttpStatusCode.InternalServerError);
                }
            });
        }

        private static List<string> ValidateBook(Book book)
        {
            var results = new List<string>();
            var context = new ValidationContext(book);
            var validationResults = new List<ValidationResult>();

            if (!Validator.TryValidateObject(book, context, validationResults, true))
            {
                foreach (var validationResult in validationResults)
                {
                    results.Add(validationResult.ErrorMessage);
                }
            }

            if (book.Year < 0 || book.Year > DateTime.UtcNow.Year)
            {
                results.Add("Year must be a valid year.");
            }

            return results;
        }
    }
}
