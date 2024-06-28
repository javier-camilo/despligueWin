using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SOFTWARE.Contexto;
using SOFTWARE.Models;

namespace SOFTWARE.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class IntervaloController : ControllerBase
    {
        private readonly TodoContext _context;

        public IntervaloController(TodoContext context)
        {
            _context = context;
        }

        // GET: api/Intervalo
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Intervalo>>> GetIntervalo()
        {
            if (_context.Intervalo == null)
            {
                return NotFound();
            }
            return await _context.Intervalo.Include(t => t.Tiempo).ToListAsync();
        }

        // GET: api/Intervalo/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Intervalo>> GetIntervalo(int id)
        {
            if (_context.Intervalo == null)
            {
                return NotFound();
            }
            var intervalo = await _context.Intervalo.Include(t => t.Tiempo).FirstOrDefaultAsync(t => t.key == id); 

            if (intervalo == null)
            {
                return NotFound();
            }

            return intervalo;
        }

        // PUT: api/Intervalo/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutIntervalo(int id, Intervalo intervalo)
        {
            if (id != intervalo.key)
            {
                return BadRequest();
            }

            var horarioExistente = await _context.Tiempo.FindAsync(intervalo.Tiempo.RefHorario);

            if (horarioExistente == null)
            {
                // Si el horario no existe, devuelve un error BadRequest
                return BadRequest("El horario especificado no existe.");
            }

            // Actualiza el campo de disponibilidad del horario si es necesario
            // Por ejemplo:
            // horarioExistente.Disponible = false;

            // Asigna el horario asociado al turno
            intervalo.Tiempo = horarioExistente;

            _context.Entry(intervalo).State = EntityState.Modified;

            
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!IntervaloExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/Intervalo
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Intervalo>> PostIntervalo(Intervalo intervalo)
        {

            if(intervalo.Tiempo==null){

                if (_context.Intervalo == null)
                {
                    return Problem("Entity set 'TodoContext.Intervalo'  is null.");
                }

                _context.Intervalo.Add(intervalo);
                await _context.SaveChangesAsync();

                return CreatedAtAction("GetIntervalo", new { id = intervalo.key }, intervalo);
            }


            if (!string.IsNullOrEmpty(intervalo.Tiempo.RefHorario))
            { 
                var horarioExistente = await _context.Tiempo.FindAsync(intervalo.Tiempo.RefHorario);
                if (horarioExistente == null)
                {
                    // Si el horario no existe, devuelve un error 400 (BadRequest)
                    return BadRequest("El horario especificado no existe.");
                }

                if (horarioExistente.Disponibilidad == false)
                {
                    // Si el horario no existe, devuelve un error 400 (BadRequest)
                    return BadRequest("El horario especificado ya no esta disponible");
                }

                horarioExistente.Disponibilidad = false;

                // Asigna el horario asociado al turno
                intervalo.Tiempo = horarioExistente;
            }

            if (_context.Intervalo == null)
                {
                    return Problem("Entity set 'TodoContext.Intervalo'  is null.");
                }

            _context.Intervalo.Add(intervalo);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetIntervalo", new { id = intervalo.key }, intervalo);
        }

        // DELETE: api/Intervalo/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteIntervalo(int id)
        {
            if (_context.Intervalo == null)
            {
                return NotFound();
            }
            var intervalo = await _context.Intervalo.FindAsync(id);
            if (intervalo == null)
            {
                return NotFound();
            }

            _context.Intervalo.Remove(intervalo);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool IntervaloExists(int id)
        {
            return (_context.Intervalo?.Any(e => e.key == id)).GetValueOrDefault();
        }
    }
}
