using System;
using System.ComponentModel.DataAnnotations;
namespace API.DTOs
{
    public class RegisterDto
    {
        [Required(ErrorMessage = "Please enter Username")]
        public string Username { get; set; }


        [Required(ErrorMessage = "Please enter Password")]
        public string Password { get; set; }


        [Required(ErrorMessage = "Please select Role for User")]
        public string Rolename { get; set; }

        public string ModifiedBy { get; set; }

        public DateTime ModifiedDate { get; set; }

    }
}