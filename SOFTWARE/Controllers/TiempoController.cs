using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.RegularExpressions;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SOFTWARE.Contexto;
using SOFTWARE.Core.Dtos;
using SOFTWARE.Models;

namespace SOFTWARE.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TiempoController : ControllerBase
    {
        private readonly TodoContext _context;

        public TiempoController(TodoContext context)
        {
            _context = context;
        }

        private ValidationProblemDetails error(string servicio, string e)
        {

            ModelState.AddModelError(servicio, e);
            var problemDetails = new ValidationProblemDetails(ModelState)
            {
                Status = StatusCodes.Status400BadRequest,
            };

            return problemDetails;
        }

        // GET: api/Tiempo
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Tiempo>>> GetTiempoHoy()
        {
            if (_context.Tiempo == null)
            {
                return NotFound();
            }

            var listado = _context.Tiempo
            .Where(t => t.Disponibilidad == true && t.HoraInicio.Date == DateTime.Today)
            .OrderBy(t => t.HoraInicio)
            .ToListAsync();

            return await listado;
        }


        [HttpGet]
        [Route("listadoTiempo")]
        public async Task<ActionResult<IEnumerable<Tiempo>>> GetTiempo()
        {
            if (_context.Tiempo == null)
            {
                return NotFound();
            }

            var listado = _context.Tiempo
            .Where(t => t.Disponibilidad == true)
            .OrderBy(t => t.HoraInicio)
            .ToListAsync();

            return await listado;
        }

        [HttpGet]
        [Route("listadoTiempoAdminsitrador")]
        public async Task<ActionResult<IEnumerable<Tiempo>>> GetTiempoAdminsitrador()
        {
            if (_context.Tiempo == null)
            {
                return NotFound();
            }

            var listado = _context.Tiempo
            .OrderBy(t => t.HoraInicio)
            .ToListAsync();

            return await listado;
        }

        // GET: api/Tiempo/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Tiempo>> GetTiempo(string id)
        {
            if (_context.Tiempo == null)
            {
                return NotFound();
            }
            var tiempo = await _context.Tiempo.FindAsync(id);

            if (tiempo == null)
            {
                return NotFound();
            }

            return tiempo;
        }


        // PUT: api/Tiempo/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutTiempo(string id, Tiempo tiempo)
        {
            if (id != tiempo.RefHorario)
            {
                return BadRequest();
            }

            _context.Entry(tiempo).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!TiempoExists(id))
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


        // POST: api/Tiempo
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<IEnumerable<Tiempo>>> PostTiempo(HorarioInputModel inputModel)
        {
            
            DateTime nuevaFechaHora = new DateTime(inputModel.FechaInicio.Year, inputModel.FechaInicio.Month, inputModel.FechaInicio.Day, 8, 00, 0);
            DateTime fechaInicio = nuevaFechaHora;
            DateTime fechaFin = inputModel.FechaFin.AddDays(1);
            TimeSpan intervaloAtencion = TimeSpan.FromMinutes(inputModel.IntervaloAtencion);
            int numeroMaximoAtencion = inputModel.NumeroMaximoTurnos;


            // Define el horario laboral (de 8:00 AM a 6:00 PM)
            TimeSpan horaInicioLaboral = new TimeSpan(8, 0, 0); // 8:00 AM
            TimeSpan horaFinLaboral = new TimeSpan(18, 0, 0); // 6:00 PM

            // Define el período de descanso (por ejemplo, de 12:00 PM a 2:00 PM)
            TimeSpan horaInicioDescanso = new TimeSpan(12, 0, 0); // 12:00 PM
            TimeSpan horaFinDescanso = new TimeSpan(14, 0, 0); // 2:00 PM

            var horarios = new List<Tiempo>();

            if (_context.Tiempo == null)
            {
                return BadRequest(error("base de datos tiempo", "no existe una base de datos registrada"));
            }

            if (inputModel.FechaFin < inputModel.FechaInicio)
            {
                return BadRequest(error("base de datos tiempo", "la fecha de fin no puede ser menor que la fecha de inicio"));
            }

            // Verificar si existen horarios registrados para las fechas especificadas
            bool horariosRegistrados = await _context.Tiempo.AnyAsync(h =>
                (h.HoraInicio.Date >= inputModel.FechaInicio.Date && h.HoraInicio.Date <= inputModel.FechaFin.Date) ||
                (h.HoraFinalizacion.Date >= inputModel.FechaInicio.Date && h.HoraFinalizacion.Date <= inputModel.FechaFin.Date));

            // Si existen horarios registrados, mostrar una advertencia
            if (horariosRegistrados)
            {
                return BadRequest(error("base de datos tiempo", "ya existe un horario registrado para esas fechas"));
            }


            while (fechaInicio.Date <= fechaFin.Date)
            {
                Console.WriteLine($"entro");
                //excluir domingos
                if (fechaInicio.DayOfWeek != DayOfWeek.Sunday)
                {

                    for (int i = 0; i < numeroMaximoAtencion; i++)
                    {

                        var horaInicio = fechaInicio.Add(intervaloAtencion * i);
                        var horaFin = horaInicio.Add(intervaloAtencion);

                        if (horaInicio.TimeOfDay < horaFinDescanso && horaFin.TimeOfDay > horaInicioDescanso)
                        {
                            if (horaInicio.TimeOfDay < horaInicioDescanso)
                            {
                                horaInicio = new DateTime(horaInicio.Year, horaInicio.Month, horaInicio.Day, horaFinDescanso.Hours, horaFinDescanso.Minutes, horaFinDescanso.Seconds);
                            }
                            if (horaFin.TimeOfDay > horaFinDescanso)
                            {
                                horaFin = horaInicio.Add(intervaloAtencion);
                            }
                        }

                        if (horaInicio.TimeOfDay < horaInicioLaboral || horaFin.TimeOfDay > horaFinLaboral)
                        {
                            continue;
                        }

                        if (horaFin <= fechaFin && horaInicio.TimeOfDay >= horaInicioLaboral && horaFin.TimeOfDay <= horaFinLaboral)
                        {
                            Console.WriteLine($"entro al registro");
                            var horario = new Tiempo
                            {
                                HoraInicio = horaInicio,
                                HoraFinalizacion = horaFin,
                                Disponibilidad = true,
                            };

                            horarios.Add(horario);
                        }


                    }

                }

                fechaInicio = fechaInicio.AddDays(1);
            }

            _context.Tiempo.AddRange(horarios);
            await _context.SaveChangesAsync();

            return horarios;
        }


        // DELETE: api/Tiempo/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteTiempo(string id)
        {
            if (_context.Tiempo == null)
            {
                return NotFound();
            }

            var turnoAsignado = await _context.Turno.AnyAsync(t => t.Tiempo.RefHorario == id);

            if (turnoAsignado)
            {
                return BadRequest("No se puede borrar el horario porque está asignado a un turno.");
            }

            var tiempo = await _context.Tiempo.FindAsync(id);
            if (tiempo == null)
            {
                return NotFound();
            }

            _context.Tiempo.Remove(tiempo);
            await _context.SaveChangesAsync();

            return NoContent();
        }


        private bool TiempoExists(string id)
        {
            return (_context.Tiempo?.Any(e => e.RefHorario == id)).GetValueOrDefault();
        }

    }
}
