﻿using ConsoleApp1.Entity;
using ConsoleApp1.Repository;
using Microsoft.Extensions.Logging;
using System.ComponentModel.DataAnnotations;

namespace ConsoleApp1.Service
{
    public class BookService : IBookService
    {
        private readonly IBookRepository _bookRepository;
        private readonly IUserRepository _userRepository;
        private readonly ILogger<BookService> _logger;

        public BookService(IBookRepository bookRepository, IUserRepository userRepository, ILogger<BookService> logger)
        {
            _bookRepository = bookRepository;
            _userRepository = userRepository;
            _logger = logger;
        }

        public void AddBook(Book book)
        {
            if (book == null)
            {
                _logger.LogWarning("Attempted to add a null book.");
                throw new ArgumentNullException(nameof(book), "Book cannot be null");
            }
            try
            {
                // Validate the Book model
                ValidateBook(book);

                // Add book to the repository
                _bookRepository.AddBook(book);
                _logger.LogInformation("Book '{Title}' added successfully.", book.Title);
            }
            catch (ArgumentException ex)
            {
                _logger.LogError(ex, "Validation failed while adding book '{Title}'.", book.Title);
                throw;
            }
            catch (InvalidOperationException ex)
            {
                _logger.LogError(ex, "Operation failed while adding book '{Title}'.", book.Title);
                throw;
            }
            catch (Exception ex)
            {
                _logger.LogCritical(ex, "An unexpected error occurred while adding book '{Title}'.", book.Title);
                throw new ApplicationException("An error occurred while adding the book.", ex);
            }
        }

        public Book GetBookById(int id)
        {
            if (id <= 0)
            {
                _logger.LogWarning("Attempted to fetch a book with invalid ID {Id}.", id);
                throw new ArgumentException("Invalid book ID", nameof(id));
            }

            var book = _bookRepository.GetBookById(id);
            if (book == null)
            {
                _logger.LogWarning("Book with ID {Id} was not found.", id);
            }
            else
            {
                _logger.LogInformation("Book with ID {Id} retrieved successfully.", id);
            }

            return book;
        }

        public IEnumerable<Book> GetAllBooks()
        {
            _logger.LogInformation("Fetching all books from the repository.");
            return _bookRepository.GetAllBooks();
        }

        public void DeleteBook(int id)
        {
            if (id <= 0)
            {
                _logger.LogWarning("Attempted to delete a book with invalid ID {Id}.", id);
                throw new ArgumentException("Invalid book ID", nameof(id));
            }

            _logger.LogInformation("Deleting book with ID {Id}.", id);
            _bookRepository.DeleteBook(id);
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
                _logger.LogWarning("Attempted to update a book with invalid ID {Id}.", book.Id);
                throw new ArgumentException("Invalid book ID", nameof(book.Id));
            }

            // Validate the Book model
            ValidateBook(book);

            // Check if the book exists before updating
            var existingBook = _bookRepository.GetBookById(book.Id);
            if (existingBook == null)
            {
                _logger.LogWarning("Book with ID {Id} does not exist.", book.Id);
                throw new InvalidOperationException("Book does not exist.");
            }

            // Preserve ratings and reviews count (in case they are updated from reviews, not manually)
            book.AverageRating = existingBook.AverageRating;
            book.TotalReviews = existingBook.TotalReviews;

            try
            {
                _logger.LogInformation("Updating book with ID {Id}.", book.Id);
                _bookRepository.UpdateBook(book);
                _logger.LogInformation("Book with ID {Id} updated successfully.", book.Id);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "An error occurred while updating book with ID {Id}.", book.Id);
                throw new ApplicationException("An error occurred while updating the book.", ex);
            }
        }

        private void ValidateBook(Book book)
        {
            var validationResults = new List<ValidationResult>();
            var context = new ValidationContext(book, serviceProvider: null, items: null);
            bool isValid = Validator.TryValidateObject(book, context, validationResults, true);

            if (!isValid)
            {
                var errors = string.Join("; ", validationResults.Select(r => r.ErrorMessage));
                _logger.LogWarning("Book validation failed: {Errors}.", errors);
                throw new ArgumentException($"Book validation failed: {errors}");
            }

            if (book.Year < 0 || book.Year > DateTime.UtcNow.Year)
            {
                _logger.LogWarning("Invalid year {Year} for book '{Title}'.", book.Year, book.Title);
                throw new ArgumentException("Year must be a valid year.", nameof(book.Year));
            }

            if (!Uri.IsWellFormedUriString(book.ImageUrl, UriKind.Absolute))
            {
                _logger.LogWarning("Invalid ImageUrl for book '{Title}'.", book.Title);
                throw new ArgumentException("Invalid Image URL.", nameof(book.ImageUrl));
            }

            // Additional checks for fields like AverageRating or TotalReviews
            if (book.AverageRating < 0 || book.AverageRating > 5)
            {
                _logger.LogWarning("Invalid rating {AverageRating} for book '{Title}'.", book.AverageRating, book.Title);
                throw new ArgumentException("Average Rating must be between 0 and 5.", nameof(book.AverageRating));
            }

            if (book.TotalReviews < 0)
            {
                _logger.LogWarning("Invalid total reviews count {TotalReviews} for book '{Title}'.", book.TotalReviews, book.Title);
                throw new ArgumentException("Total reviews must be non-negative.", nameof(book.TotalReviews));
            }
        }
    }
}