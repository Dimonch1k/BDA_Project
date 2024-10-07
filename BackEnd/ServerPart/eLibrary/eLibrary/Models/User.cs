using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace eLibrary.Models
{
    public class User
    {
        public int Id { get; set; }

        public string Name { get; set; }

        public string Email { get; set; }

        public string Password { get; set; } // Hashed password

        public int PositiveRating { get; set; } 
        public int NegativeRating { get; set; } 

        public DateTime CreatedAt { get; set; }
    }
}
