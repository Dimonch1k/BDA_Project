using System.ComponentModel.DataAnnotations;

namespace ConsoleApp1.Entity
{
    public class Post
    {
        public int Id { get; set; }

        [Required(ErrorMessage = "Title is required")]
        [StringLength(255, ErrorMessage = "Title cannot exceed 255 characters")]
        public required string Title { get; set; }

        [Required(ErrorMessage = "Content is required")]
        public required string Content { get; set; }

        [Required(ErrorMessage = "Author ID is required")]
        public int AuthorId { get; set; }

        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    }
}
