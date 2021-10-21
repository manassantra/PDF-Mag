using System;
using System.ComponentModel.DataAnnotations;
namespace API.DTOs
{
    public class AccessDto
    {
        [Required(ErrorMessage = "Please enter Role-Id")]
        public int Roleid { get; set; }

        [Required(ErrorMessage = "Please enter Rolename")]
        public string Rolename { get; set; }

        public string ModifiedBy { get; set; }

        public DateTime ModifiedDate { get; set; }

    }
}