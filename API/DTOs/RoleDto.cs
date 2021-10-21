using System;
namespace API.DTOs
{
    public class RoleDto
    {
        public int Roleid { get; set; }
        public string Rolename { get; set; }
        public string ModifiedBy { get; set; }
        public DateTime ModifiedDate { get; set; }

    }
}