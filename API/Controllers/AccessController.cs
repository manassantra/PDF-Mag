using System;
using System.IO;
using System.Threading;
using System.Text;
using System.Security.Cryptography;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using API.Entities;
using API.Data;
using API.DTOs;
using API.Interfaces;
using System.Threading.Tasks;

namespace API.Controllers
{
    public class AccessController : BaseApiController
    {

        private readonly DataContext _context ;
        
        public AccessController(DataContext context)
        {
            _context = context;
        } 

        [HttpPost("addrole")]
        public async Task<ActionResult<RoleDto>> AddRole(AccessDto accessDto)
        {
            if (await RoleExists(accessDto.Roleid)) return BadRequest("Role already exist");

                var role = new AppRole
            {
                RoleId = accessDto.Roleid,
                RoleName = accessDto.Rolename.ToLower(),
                ModifiedBy = accessDto.ModifiedBy,
                ModifiedDate = DateTime.Now
            };
            
            _context.Roles.Add(role);
            await _context.SaveChangesAsync();

            return new RoleDto
            {
                Roleid = role.RoleId,
                Rolename = role.RoleName,
                ModifiedBy = role.ModifiedBy,
                ModifiedDate = role.ModifiedDate
            };
        }


        private async Task<bool> RoleExists(int roleid)
        {
            return await _context.Roles.AnyAsync(x => x.RoleId == roleid);
        }
    }
}