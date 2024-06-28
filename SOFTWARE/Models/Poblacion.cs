using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace SOFTWARE.Models
{
    public class Poblacion
    {

        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public long Id { get; set; }

        
        [Required(ErrorMessage="el nombre es requerido")]
        public string? Nombre { get; set; }

        
        [Required(ErrorMessage="la prioridad es requerida")]
        public int Prioridad { get; set; }
        
    }
}