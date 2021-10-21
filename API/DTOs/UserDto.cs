using System;
namespace API.DTOs
{
    public class UserDto
    {
        public string Username { get; set; }
        public string Rolename { get; set; }
        public string Token { get; set; }
        public string ModifiedBy { get; set; }

        public DateTime ModifiedDate { get; set; }

    }
}