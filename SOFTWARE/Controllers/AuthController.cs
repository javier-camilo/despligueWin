using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using SOFTWARE.Contexto;
using SOFTWARE.Core.Dtos;
using SOFTWARE.Core.OtherObjects;
using SOFTWARE.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.CodeAnalysis.CSharp.Syntax;
using System.Diagnostics;
using SOFTWARE.Servicios;

namespace SOFTWARE.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {

        private readonly UserManager<ApplicationUser> _userManager;
        private readonly RoleManager<IdentityRole> _roleManager;
        private readonly IConfiguration _configuration;

        private readonly TodoContext _context;



        public AuthController(UserManager<ApplicationUser> userManager,
                RoleManager<IdentityRole> roleManager, IConfiguration configuration, TodoContext context)
        {
            _userManager = userManager;
            _roleManager = roleManager;
            _configuration = configuration;
            _context = context;
        }


        [HttpPost]
        [Route("seed-roles")]
        public async Task<IActionResult> SeedRoles()
        {

            bool isOwnerRoleExists = await _roleManager.RoleExistsAsync(StaticUserRoles.OWNER);
            bool isAdminRoleExists = await _roleManager.RoleExistsAsync(StaticUserRoles.ADMIN);
            bool isUserRoleExists = await _roleManager.RoleExistsAsync(StaticUserRoles.USER);


            if (isOwnerRoleExists && isAdminRoleExists && isUserRoleExists)
                return Ok("todos los roles estan ya creados");


            await _roleManager.CreateAsync(new IdentityRole(StaticUserRoles.USER));
            await _roleManager.CreateAsync(new IdentityRole(StaticUserRoles.ADMIN));
            await _roleManager.CreateAsync(new IdentityRole(StaticUserRoles.OWNER));

            return Ok("los roles se crearon correctamente");
        }

        [HttpPost]
        [Route("seed-Users")]
        public async Task<IActionResult> SeedUsers()
        {

            var isOwnerExists = await _userManager.FindByNameAsync("Administrador");

            if(isOwnerExists!=null){
                return BadRequest(error("Duplicado", "los usuarios ya estan registrados"));
            }

            bool isOwnerRoleExists = await _roleManager.RoleExistsAsync(StaticUserRoles.OWNER);
            bool isAdminRoleExists = await _roleManager.RoleExistsAsync(StaticUserRoles.ADMIN);
            bool isUserRoleExists = await _roleManager.RoleExistsAsync(StaticUserRoles.USER);


            if (!(isOwnerRoleExists && isAdminRoleExists && isUserRoleExists)){
                return BadRequest(error("validacion", "no existen roles aun en el sistema"));
            }

            UserSeed userSeed = new UserSeed();

            var owner = userSeed.owner();
            await _userManager.CreateAsync(owner, "admin123");
            await _userManager.AddToRoleAsync(owner, StaticUserRoles.USER);
            await _userManager.AddToRoleAsync(owner, StaticUserRoles.OWNER);

            var admin = userSeed.admin();
            await _userManager.CreateAsync(admin, "contratista123");
            await _userManager.AddToRoleAsync(admin, StaticUserRoles.USER);
            await _userManager.AddToRoleAsync(admin, StaticUserRoles.ADMIN);

            var user = userSeed.user();
            await _userManager.CreateAsync(user, "user123");
            await _userManager.AddToRoleAsync(user, StaticUserRoles.USER);

            return Ok("los usuarios se crearon correctamente");
        }


        private bool ValidarRegistro(string identificacion) {


            var ListadoUsuarios = _context.Users.ToList();
            foreach (var item in ListadoUsuarios)
            {
                if (item.Identificacion.Equals(identificacion)) {
                    return true;
                }

            }
            return false;
        }


        private ValidationProblemDetails error(string servicio, string e) {

            ModelState.AddModelError(servicio, e);
            var problemDetails = new ValidationProblemDetails(ModelState)
            {
                Status = StatusCodes.Status400BadRequest,
            };

            return problemDetails;
        }

        [HttpPost]
        [Route("register")]
        public async Task<ActionResult<ApplicationUser>> Register([FromBody] RegisterDto registerDto)
        {
            var isExistsUser = await _userManager.FindByNameAsync(registerDto.UserName);
            if (isExistsUser != null)
                return BadRequest(error("Duplicado", "el nombre de usuario  ya esta registrado"));

            if (ValidarRegistro(registerDto.Identificacion))
                return BadRequest(error("Duplicado", "la identificacion ya pertenece a un usuario"));

            ApplicationUser newUser = new ApplicationUser()
            {
                Identificacion = registerDto.Identificacion,
                Nombre = registerDto.Nombre,
                Apellido = registerDto.Apellido,
                PhoneNumber = registerDto.Telefono,
                Email = registerDto.Email,
                UserName = registerDto.UserName,
                SecurityStamp = Guid.NewGuid().ToString(),
            };

            var createUserResult = await _userManager.CreateAsync(newUser, registerDto.Password);

            if (!createUserResult.Succeeded)
            {

                var errorString = "creacion de usuario fallida por: ";
                foreach (var error in createUserResult.Errors)
                {
                    ModelState.AddModelError(errorString, error.Description);
                }

                var problemDetails = new ValidationProblemDetails(ModelState)
                {
                    Status = StatusCodes.Status400BadRequest,
                };

                return BadRequest(problemDetails);
            }

            // Add a Default USER Role to all users
            await _userManager.AddToRoleAsync(newUser, StaticUserRoles.USER);

            return Ok(newUser);
        }


        [HttpGet]
        [Route("traerUsuario/{id}")]
        public async Task<ActionResult<ApplicationUser>> GetUser(string id)
        {
            if (_context.Users == null)
            {
                return BadRequest(error("Usuarios", "no existe base de datos de usuarios"));
            }

            ApplicationUser user;
            user = null;

            var listado = await _context.Users.ToListAsync();

            foreach (var item in listado)
            {
                if (item.Identificacion.Equals(id)) {
                    user = item;
                }
            }

            if (user == null) {
                return BadRequest(error("Consultar usuario", "no se encontro ningun turno con esos datos"));
            }

            return Ok(user);
        }


        // Route -> Login
        [HttpPost]
        [Route("login")]
        public async Task<ActionResult<ApplicationUserViewModel>> Login([FromBody] LoginDto loginDto)
        {
            var user = await _userManager.FindByNameAsync(loginDto.UserName);

            if (user is null)
                return Unauthorized("credenciales invalidas");

            var isPasswordCorrect = await _userManager.CheckPasswordAsync(user, loginDto.Password);

            if (!isPasswordCorrect)
                return Unauthorized("credenciales invalidas");

            var userRoles = await _userManager.GetRolesAsync(user);

            var authClaims = new List<Claim>
            {
                new Claim(ClaimTypes.Name, user.UserName),
                new Claim(ClaimTypes.NameIdentifier, user.Id),
                new Claim("JWTID", Guid.NewGuid().ToString()),
                new Claim("Identificacion",user.Identificacion),
                new Claim("Nombre",user.Nombre),
                new Claim("Apellido",user.Apellido),
                new Claim("Telefono",user.PhoneNumber),
                new Claim("Email",user.Email),
                new Claim("UserName",user.UserName),
            };

            foreach (var userRole in userRoles)
            {
                authClaims.Add(new Claim("rol", userRole));
                authClaims.Add(new Claim(ClaimTypes.Role, userRole));
            }

            var token = GenerateNewJsonWebToken(authClaims);

            return new ApplicationUserViewModel
            {
                result = true,
                UserName = user.UserName,
                Token = token
            };
        }

        private string GenerateNewJsonWebToken(List<Claim> claims)
        {
            var authSecret = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["JWT:Secret"]));

            var tokenObject = new JwtSecurityToken(
                    issuer: _configuration["JWT:ValidIssuer"],
                    audience: _configuration["JWT:ValidAudience"],
                    expires: DateTime.Now.AddHours(1),
                    claims: claims,
                    signingCredentials: new SigningCredentials(authSecret, SecurityAlgorithms.HmacSha256)
                );

            string token = new JwtSecurityTokenHandler().WriteToken(tokenObject);

            return token;
        }



        // Route -> make user -> admin
        [HttpPost]
        [Route("make-admin")]
        [Authorize(Roles = StaticUserRoles.OWNER)]
        public async Task<ActionResult<ApplicationUserViewModel>> MakeAdmin([FromBody] UpdatePermissionDto updatePermissionDto)
        {
            var user = await _userManager.FindByNameAsync(updatePermissionDto.UserName);

            if (user is null)
                return BadRequest("usuario invalido!!!!!!!!");

            await _userManager.AddToRoleAsync(user, StaticUserRoles.ADMIN);

            return new ApplicationUserViewModel
            {
                result = true,
                UserName = user.UserName
            };

        }


        [HttpPost]
        [Route("remove-admin")]
        [Authorize(Roles = StaticUserRoles.OWNER)]
        public async Task<ActionResult<ApplicationUserViewModel>> RemoveAdmin([FromBody] UpdatePermissionDto updatePermissionDto)
        {
            var user = await _userManager.FindByNameAsync(updatePermissionDto.UserName);

            if (user is null)
                return BadRequest("usuario invalido!!!!!!!!");

            await _userManager.RemoveFromRoleAsync(user, StaticUserRoles.ADMIN);

            return new ApplicationUserViewModel
            {
                result = true,
                UserName = user.UserName
            };

        }


        // Route -> make user -> owner
        [HttpPost]
        [Route("make-owner")]
        [Authorize(Roles = StaticUserRoles.OWNER)]
        public async Task<ActionResult<ApplicationUserViewModel>> MakeOwner([FromBody] UpdatePermissionDto updatePermissionDto)
        {
            var user = await _userManager.FindByNameAsync(updatePermissionDto.UserName);

            if (user is null)
                return BadRequest("usuario invalido!!!!!!!!!");

            await _userManager.AddToRoleAsync(user, StaticUserRoles.OWNER);

            return new ApplicationUserViewModel
            {
                result = true,
                UserName = user.UserName
            };

        }

        [HttpPost]
        [Route("remove-owner")]
        [Authorize(Roles = StaticUserRoles.OWNER)]
        public async Task<ActionResult<ApplicationUserViewModel>> RemoveOwner([FromBody] UpdatePermissionDto updatePermissionDto)
        {
            var user = await _userManager.FindByNameAsync(updatePermissionDto.UserName);

            if (user is null)
                return BadRequest("usuario invalido!!!!!!!!!");

            await _userManager.RemoveFromRoleAsync(user, StaticUserRoles.OWNER);

            return new ApplicationUserViewModel
            {
                result = true,
                UserName = user.UserName
            };

        }


        [HttpGet]
        [Route("Listado-usuarios")]
        public async Task<ActionResult<IEnumerable<ApplicationUser>>> GetMotivo()
        {
            if (_context.Users == null)
            {
                return NotFound();
            }
            return await _context.Users.ToListAsync();
        }



        [HttpDelete("{identificacion}")]
        public async Task<IActionResult> DeleteUser(string identificacion)
        {

            if (_context.Users == null)
            {
                return BadRequest(error("vacio", "no existe base de datos"));
            }

            List<ApplicationUser> listado = await _context.Users.ToListAsync();
            ApplicationUser usuario;
            usuario = null;

            foreach (var item in listado)
            {
                if(item.Identificacion==identificacion){
                    usuario = item;
                }
            }

            if (usuario==null)
            {
                return BadRequest(error("vacio", "el usuario no existe"));
            }

            var asociadoTurno = validarTurnoAsociado(identificacion);

            if(asociadoTurno)
            {
                return BadRequest(error("vacio", "el usuario tiene turnos asoaciados"));
            }

            await _userManager.DeleteAsync(usuario);
            await _context.SaveChangesAsync();

            return NoContent();

        }

        private bool validarTurnoAsociado(string identificacion){

            var contador = 0;
            var listadoTurno = _context.Turno.ToList();

            foreach (var item in listadoTurno)
            {
                if(item.RefSolicitante==identificacion){
                    contador = contador + 1;
                }

                if (item.ContratistaAtendio==identificacion)
                {
                    contador = contador + 1;
                }
                
            }
            
            if(contador==0){
                return false;
            }else{
                return true;
            }
        }



    }
}