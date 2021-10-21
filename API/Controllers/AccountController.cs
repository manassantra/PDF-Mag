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
    public class AccountController : BaseApiController
    {

        private readonly DataContext _context ;
        private readonly ITokenService _tokenService;
        
        public AccountController(DataContext context, ITokenService tokenService)
        {
            _tokenService = tokenService;
            _context = context;
        } 

        [HttpPost("register")]
        public async Task<ActionResult<UserDto>> Register(RegisterDto registerDto)
        {
            if (await UserExists(registerDto.Username)) return BadRequest("Username already taken");

            using var hmac = new HMACSHA512();
            var user = new AppUser
            {
                UserName = registerDto.Username.ToLower(),
                RoleName = registerDto.Rolename.ToLower(),
                PasswordHash = hmac.ComputeHash(Encoding.UTF32.GetBytes(registerDto.Password)),
                PasswordSalt = hmac.Key,
                ModifiedBy = registerDto.ModifiedBy,
                ModifiedDate = DateTime.Now
            };
            
            _context.Users.Add(user);
            await _context.SaveChangesAsync();

            return new UserDto
            {
                Username = user.UserName,
                Rolename = user.RoleName,
                ModifiedBy = user.ModifiedBy,
                ModifiedDate = user.ModifiedDate,
                Token =  _tokenService.CreateToken(user)
            };
        }


        [HttpPost("login")]
        public async Task<ActionResult<UserDto>> Login(LoginDto loginDto)
        {
            var user = await _context.Users
            .SingleOrDefaultAsync(x => x.UserName == loginDto.Username);

            if (user == null) return Unauthorized("Invalid User");

            using var hmac = new HMACSHA512(user.PasswordSalt);
            var computedHash = hmac.ComputeHash(Encoding.UTF32.GetBytes(loginDto.Password));
            for (int i=0; i<computedHash.Length; i++)
            {
                if (computedHash[i] != user.PasswordHash[i])  return Unauthorized("Invalid Password");
            }

             return new UserDto
            {
                Username = user.UserName,
                Rolename = user.RoleName,
                ModifiedBy = user.ModifiedBy,
                ModifiedDate = user.ModifiedDate,
                Token =  _tokenService.CreateToken(user)
            };
        }


        private async Task<bool> UserExists(string username)
        {
            return await _context.Users.AnyAsync(x => x.UserName == username.ToLower());
        }
    }
}