using System.Net;
using System.Collections.Generic;
using System;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using System.Linq;
using API.Data;
using API.Entities;

namespace API.Controllers
{

    public class RolesController : BaseApiController
    {
        private readonly DataContext _context;
        public RolesController(DataContext context)
        {
            _context = context;
        }

        [AllowAnonymous]
        [HttpGet]
        public ActionResult<IList<AppRole>> GetRoles()
        {
             return _context.Roles.ToList();
        }

        [Authorize]
        [HttpGet("{id}")]
        public ActionResult<AppRole> GetRoles(int id)
        {
                return _context.Roles.Find(id);
        }

    }
}