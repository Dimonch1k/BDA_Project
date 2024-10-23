using System;
using System.ComponentModel.DataAnnotations;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ConsoleApp1.Entity
{
    public class Book
    {
        public int Id { get; set; }

        [Required(ErrorMessage = "Title is required.")]
        [StringLength(255, ErrorMessage = "Title cannot exceed 255 characters.")]
        public required string Title { get; set; }

        [Required(ErrorMessage = "Author is required.")]
        [StringLength(100, ErrorMessage = "Author cannot exceed 100 characters.")]
        public required string Author { get; set; }

        public required string Genre { get; set; }

        [Required(ErrorMessage = "Year is required.")]
        [Range(0, 9999, ErrorMessage = "Year must be a valid year.")]
        public int Year { get; set; }

        public required string Description { get; set; }

        public required string ImageUrl { get; set; }

        public decimal AverageRating { get; set; } = 0;

        public int TotalReviews { get; set; } = 0;

        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    }
}
