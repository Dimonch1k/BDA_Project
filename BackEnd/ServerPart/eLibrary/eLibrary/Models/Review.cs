using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace eLibrary.Models
{
    public class Review
    {
        public int Id { get; set; }

        public int UserId { get; set; }

        public int BookId { get; set; }

        public string ReviewText { get; set; }

        public int Rating { get; set; }

        public DateTime CreatedAt { get; set; }

        public bool IsModerated { get; set; } = false;

        public User User { get; set; }

        public Book Book { get; set; }
    }
}
