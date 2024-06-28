using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace SOFTWARE.Models
{
    public class Intervalo
    {

        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int key { get; set; }
        public string? Dia { get; set; }
        public DateTime HoraInicio { get; set; }
        
        public DateTime HoraFinalizacion { get; set; }

        public string? Disponibilidad { get; set; }
        
        public Tiempo? Tiempo { get; set; }
    }
}