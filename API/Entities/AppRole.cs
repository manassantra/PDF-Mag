using System;
namespace API.Entities
{
    public class AppRole
    {
        public int Id { get; set; }
        public int RoleId { get; set; }
        public string RoleName { get; set; }
        public string ModifiedBy { get; set; }
        public DateTime ModifiedDate { get; set; }
       
    }
}