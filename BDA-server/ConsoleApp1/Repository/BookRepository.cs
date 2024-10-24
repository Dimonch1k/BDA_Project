using ConsoleApp1.Entity;
using Dapper;
using Microsoft.Extensions.Logging;
using MySql.Data.MySqlClient;
using System.Data;

namespace ConsoleApp1.Repository
{
    public class BookRepository : IBookRepository
    {
        private readonly string _connectionString;
        private readonly ILogger<BookRepository> _logger;

        public BookRepository(string connectionString, ILogger<BookRepository> logger)
        {
            _connectionString = connectionString;
            _logger = logger;
        }

        public void AddBook(Book book)
        {
            if (book == null)
            {
                _logger.LogWarning("Attempted to add a null book.");
                throw new ArgumentNullException(nameof(book), "Book cannot be null");
            }

            ValidateBook(book);

            try
            {
                using (IDbConnection db = new MySqlConnection(_connectionString))
                {
                    var sql = @"INSERT INTO books 
                                (title, author, genre, description, image_url, year, average_rating, total_reviews, created_at) 
                                VALUES (@Title, @Author, @Genre, @Description, @imagePath, @Year, @AverageRating, @TotalReviews, @CreatedAt)";
                    db.Execute(sql, book);
                    _logger.LogInformation("Book '{Title}' added successfully.", book.Title);
                }
            }
            catch (MySqlException ex)
            {
                HandleMySqlException(ex, book, "add");
            }
        }

        public Book? GetBookById(int id)
        {
            if (id <= 0)
            {
                throw new ArgumentException("Invalid book ID", nameof(id));
            }

            try
            {
                using (IDbConnection db = new MySqlConnection(_connectionString))
                {
                    return db.QueryFirstOrDefault<Book>("SELECT * FROM books WHERE id = @Id", new { Id = id });
                }
            }
            catch (MySqlException ex)
            {
                _logger.LogError(ex, "Failed to retrieve book with ID '{Id}' due to a database error.", id);
                throw new InvalidOperationException("An error occurred while retrieving the book.", ex);
            }
        }

        public IEnumerable<Book> GetAllBooks()
        {
            try
            {
                using (IDbConnection db = new MySqlConnection(_connectionString))
                {
                    return db.Query<Book>("SELECT id, title, author, genre, description, imagePath, averageRating, totalReviews, createdAt FROM books;").AsList();
                }
            }
            catch (MySqlException ex)
            {
                _logger.LogError(ex, "An error occurred while retrieving the list of books.");
                throw new InvalidOperationException("An error occurred while retrieving the list of books.", ex);
            }
        }

        public void DeleteBook(int id)
        {
            if (id <= 0)
            {
                throw new ArgumentException("Invalid book ID", nameof(id));
            }

            try
            {
                using (IDbConnection db = new MySqlConnection(_connectionString))
                {
                    var sql = "DELETE FROM books WHERE id = @Id";
                    var rowsAffected = db.Execute(sql, new { Id = id });

                    if (rowsAffected == 0)
                    {
                        _logger.LogWarning("Attempted to delete a non-existing book with ID '{Id}'.", id);
                        throw new InvalidOperationException("Book does not exist.");
                    }

                    _logger.LogInformation("Book with ID '{Id}' deleted successfully.", id);
                }
            }
            catch (MySqlException ex)
            {
                _logger.LogError(ex, "Failed to delete book with ID '{Id}' due to a database error.", id);
                throw new InvalidOperationException("An error occurred while deleting the book.", ex);
            }
        }

        public void UpdateBook(Book book)
        {
            if (book == null)
            {
                _logger.LogWarning("Attempted to update a null book.");
                throw new ArgumentNullException(nameof(book), "Book cannot be null");
            }

            if (book.Id <= 0)
            {
                throw new ArgumentException("Invalid book ID", nameof(book.Id));
            }

            ValidateBook(book);

            try
            {
                using (IDbConnection db = new MySqlConnection(_connectionString))
                {
                    var sql = @"UPDATE books 
                                SET title = @Title, 
                                    author = @Author, 
                                    genre = @Genre, 
                                    description = @Description, 
                                    image_url = @imagePath, 
                                    year = @Year, 
                                    average_rating = @AverageRating, 
                                    total_reviews = @TotalReviews 
                                WHERE id = @Id";
                    var rowsAffected = db.Execute(sql, book);

                    if (rowsAffected == 0)
                    {
                        _logger.LogWarning("Attempted to update a non-existing book with ID '{Id}'.", book.Id);
                        throw new InvalidOperationException("Book does not exist.");
                    }

                    _logger.LogInformation("Book '{Title}' updated successfully.", book.Title);
                }
            }
            catch (MySqlException ex)
            {
                HandleMySqlException(ex, book, "update");
            }
        }

        private void ValidateBook(Book book)
        {
            if (string.IsNullOrWhiteSpace(book.Title))
            {
                throw new ArgumentException("Title is required.", nameof(book.Title));
            }

            if (string.IsNullOrWhiteSpace(book.Author))
            {
                throw new ArgumentException("Author is required.", nameof(book.Author));
            }

            if (book.Year < 0 || book.Year > DateTime.UtcNow.Year)
            {
                throw new ArgumentException("Year must be a valid year.", nameof(book.Year));
            }
        }

        private void HandleMySqlException(MySqlException ex, Book book, string operation)
        {
            switch (ex.Number)
            {
                case 1062: // Duplicate entry
                    _logger.LogError(ex, "Failed to {Operation} book '{Title}': Duplicate entry.", operation, book.Title);
                    throw new InvalidOperationException($"A book with the title '{book.Title}' already exists. Please choose a different title.", ex);
                case 1045: // Access denied
                    _logger.LogError(ex, "Failed to {Operation} book '{Title}': Access denied.", operation, book.Title);
                    throw new InvalidOperationException("Access denied. Please check your database credentials.", ex);
                case 1049: // Unknown database
                    _logger.LogError(ex, "Failed to {Operation} book '{Title}': Unknown database.", operation, book.Title);
                    throw new InvalidOperationException("The specified database does not exist. Please check your database configuration.", ex);
                case 2002: // Connection error
                    _logger.LogError(ex, "Failed to {Operation} book '{Title}': Could not connect to the database server.", operation, book.Title);
                    throw new InvalidOperationException("Could not connect to the database server. Please check your connection settings.", ex);
                case 1054: // Unknown column
                    _logger.LogError(ex, "Failed to {Operation} book '{Title}': One or more columns in the operation do not exist.", operation, book.Title);
                    throw new InvalidOperationException("One or more columns in the operation do not exist.", ex);
                case 1146: // Table doesn't exist
                    _logger.LogError(ex, "Failed to {Operation} book '{Title}': The specified table does not exist.", operation, book.Title);
                    throw new InvalidOperationException("The specified table does not exist. Please check your database schema.", ex);
                case 1213: // Deadlock
                    _logger.LogError(ex, "Failed to {Operation} book '{Title}': A deadlock occurred.", operation, book.Title);
                    throw new InvalidOperationException("A deadlock occurred. Please try again.", ex);
                case 1366: // Incorrect string value
                    _logger.LogError(ex, "Failed to {Operation} book '{Title}': Incorrect string value.", operation, book.Title);
                    throw new InvalidOperationException("An incorrect string value was entered. Please check your input data.", ex);
                case 1451: // Foreign key constraint fails (on delete or update)
                    _logger.LogError(ex, "Failed to {Operation} book '{Title}': Foreign key constraint fails.", operation, book.Title);
                    throw new InvalidOperationException("This book is associated with other records and cannot be deleted/updated.", ex);
                case 1452: // Foreign key constraint fails (on insert)
                    _logger.LogError(ex, "Failed to {Operation} book '{Title}': Foreign key constraint fails.", operation, book.Title);
                    throw new InvalidOperationException("One of the foreign key constraints was violated. Please check related data.", ex);
                default:
                    _logger.LogError(ex, "An unexpected error occurred while {Operation} book '{Title}'.", operation, book.Title);
                    throw new InvalidOperationException("An unexpected error occurred while processing the book.", ex);
            }
        }
    }
}
