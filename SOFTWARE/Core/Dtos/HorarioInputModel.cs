using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace SOFTWARE.Core.Dtos
{
    public class HorarioInputModel
    {
        
        [Required(ErrorMessage = "El campo FechaInicio es obligatorio.")]
        public DateTime FechaInicio { get; set; }

        [Required(ErrorMessage = "es requerido que digite la hora de fin")]
        public DateTime FechaFin { get; set; }

        [Required(ErrorMessage = "debe digitar el intervalo de atencion")]
        public int IntervaloAtencion { get; set; }

        [Required(ErrorMessage = "es requerido que digite el numero maximo de turnos")]
        public int NumeroMaximoTurnos { get; set; }
        
    }
}