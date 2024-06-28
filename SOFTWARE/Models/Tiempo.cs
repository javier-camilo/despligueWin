using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace SOFTWARE.Models
{
    public class Tiempo
    {

        
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public string? RefHorario { get; set; }
        

        [Required(ErrorMessage = "es requerido que digite la hora de inicio")]
        public DateTime HoraInicio { get; set; }


        [Required(ErrorMessage = "es requerido que digite la hora de fin")]
        public DateTime HoraFinalizacion { get; set; }


        [Required(ErrorMessage = "debe colocar la disponibilidad")]
        public bool Disponibilidad { get; set; }
    }
}