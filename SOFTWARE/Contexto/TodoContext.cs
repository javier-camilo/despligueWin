using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using SOFTWARE.Models;
using SOFTWARE.Pages;
using SOFTWARE.Servicios;

namespace SOFTWARE.Contexto
{

        public class TodoContext : IdentityDbContext<ApplicationUser>
    {
        public TodoContext(DbContextOptions<TodoContext> options)
            : base(options)
        {
        }

        public DbSet<Poblacion> Poblacion { get; set; } = null!;
        public DbSet<Motivo> Motivo { get; set; } = null!;
        public DbSet<SOFTWARE.Models.Turno> Turno { get; set; } = default!;
        public DbSet<Tiempo> Tiempo { get; set; } = null!;
        public DbSet<Intervalo> Intervalo { get; set; } = null!;

    }

}