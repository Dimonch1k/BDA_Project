using ConsoleApp1.Entity;
using ConsoleApp1.Repository;
using Dapper;
using MySql.Data.MySqlClient;
using Microsoft.Extensions.Logging; 
using System;
using System.Collections.Generic;
using System.Data;

namespace ConsoleApp1.Repository
{
    public class PostRepository : IPostRepository
    {
        private readonly string _connectionString;
        private readonly ILogger<PostRepository> _logger; 

        public PostRepository(string connectionString, ILogger<PostRepository> logger)
        {
            _connectionString = connectionString;
            _logger = logger; 
        }

        public void CreatePost(Post post)
        {
            if (post == null)
            {
                _logger.LogWarning("Attempted to create a null post.");
                throw new ArgumentNullException(nameof(post), "Post cannot be null");
            }

            ValidatePost(post);

            try
            {
                using (IDbConnection db = new MySqlConnection(_connectionString))
                {
                    var sql = "INSERT INTO posts (title, content, author_id) VALUES (@Title, @Content, @AuthorId)";
                    db.Execute(sql, post);
                    _logger.LogInformation("Post '{Title}' created successfully by Author ID {AuthorId}.", post.Title, post.AuthorId);
                }
            }
            catch (MySqlException ex)
            {
                // Log the MySQL specific errors
                switch (ex.Number)
                {
                    case 1452: // Cannot add or update a child row: a foreign key constraint fails
                        _logger.LogError(ex, "Failed to create post '{Title}': Author does not exist.", post.Title);
                        throw new InvalidOperationException("Author does not exist.", ex);
                    case 1062: // Duplicate entry
                        _logger.LogError(ex, "Failed to create post '{Title}': Duplicate entry.", post.Title);
                        throw new InvalidOperationException("A post with this title already exists.", ex);
                    case 1045: // Access denied
                        _logger.LogError(ex, "Failed to create post '{Title}': Access denied.", post.Title);
                        throw new InvalidOperationException("Access denied. Please check your database credentials.", ex);
                    case 1049: // Unknown database
                        _logger.LogError(ex, "Failed to create post '{Title}': Unknown database.", post.Title);
                        throw new InvalidOperationException("The specified database does not exist.", ex);
                    case 2002: // Connection error (e.g. can't connect to server)
                        _logger.LogError(ex, "Failed to create post '{Title}': Could not connect to the database server.", post.Title);
                        throw new InvalidOperationException("Could not connect to the database server. Please check your connection settings.", ex);
                    case 1054: // Unknown column
                        _logger.LogError(ex, "Failed to create post '{Title}': One or more columns in the insert statement do not exist.", post.Title);
                        throw new InvalidOperationException("One or more columns in the insert statement do not exist.", ex);
                    case 1146: // Table doesn't exist
                        _logger.LogError(ex, "Failed to create post '{Title}': The specified table does not exist.", post.Title);
                        throw new InvalidOperationException("The specified table does not exist.", ex);
                    case 1213: // Deadlock
                        _logger.LogError(ex, "Failed to create post '{Title}': A deadlock occurred.", post.Title);
                        throw new InvalidOperationException("A deadlock occurred. Please try again.", ex);
                    default:
                        _logger.LogError(ex, "An unexpected error occurred while creating post '{Title}'.", post.Title);
                        throw new InvalidOperationException("An unexpected error occurred while creating the post.", ex);
                }
            }
        }

        public Post? GetPostById(int id)
        {
            if (id <= 0)
            {
                _logger.LogWarning("Attempted to retrieve a post with an invalid ID: {PostId}.", id);
                throw new ArgumentException("Invalid post ID", nameof(id));
            }

            using (IDbConnection db = new MySqlConnection(_connectionString))
            {
                var post = db.QueryFirstOrDefault<Post>("SELECT * FROM posts WHERE id = @Id", new { Id = id });
                if (post == null)
                {
                    _logger.LogWarning("Post with ID {PostId} not found.", id);
                }
                else
                {
                    _logger.LogInformation("Post with ID {PostId} retrieved successfully.", id);
                }
                return post;
            }
        }

        public IEnumerable<Post> GetAllPosts()
        {
            using (IDbConnection db = new MySqlConnection(_connectionString))
            {
                var posts = db.Query<Post>("SELECT * FROM posts ORDER BY created_at DESC").AsList();
                _logger.LogInformation("Retrieved {PostCount} posts successfully.", posts.Count);
                return posts;
            }
        }

        public void DeletePost(int id)
        {
            if (id <= 0)
            {
                _logger.LogWarning("Attempted to delete a post with an invalid ID: {PostId}.", id);
                throw new ArgumentException("Invalid post ID", nameof(id));
            }

            using (IDbConnection db = new MySqlConnection(_connectionString))
            {
                var sql = "DELETE FROM posts WHERE id = @Id";
                var rowsAffected = db.Execute(sql, new { Id = id });
                if (rowsAffected > 0)
                {
                    _logger.LogInformation("Post with ID {PostId} deleted successfully.", id);
                }
                else
                {
                    _logger.LogWarning("No post found with ID {PostId} to delete.", id);
                }
            }
        }

        private void ValidatePost(Post post)
        {
            if (string.IsNullOrWhiteSpace(post.Title))
            {
                _logger.LogWarning("Post validation failed: Title is required.");
                throw new ArgumentException("Title is required.", nameof(post.Title));
            }

            if (post.Title.Length > 255)
            {
                _logger.LogWarning("Post validation failed: Title cannot exceed 255 characters.");
                throw new ArgumentException("Title cannot exceed 255 characters.", nameof(post.Title));
            }

            if (string.IsNullOrWhiteSpace(post.Content))
            {
                _logger.LogWarning("Post validation failed: Content is required.");
                throw new ArgumentException("Content is required.", nameof(post.Content));
            }

            if (post.AuthorId <= 0)
            {
                _logger.LogWarning("Post validation failed: Invalid Author ID.");
                throw new ArgumentException("Invalid Author ID.", nameof(post.AuthorId));
            }
        }
    }
}
