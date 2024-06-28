using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace SOFTWARE.Models
{
    public class Turno
    {
        

        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Numero { get; set; }


        [Required(ErrorMessage = "el motivo es requerido")]
        public string Motivo { get; set; }

        public string Asistencia { get; set; }

        public string DescripcionOperacion { get; set; }

        public string ContratistaAtendio { get; set; }

        public string Observacion { get; set; }


        //falta agregar funcion 
        public string RefTiempo { get; set; }

        public string FechaFinalizacion { get; set; }

        //


        [Required(ErrorMessage = "los datos del solicitante son requeridos")]
        public string RefSolicitante { get; set; }

        [Required(ErrorMessage = "la poblacion es requerida")]
        public string Poblacion { get; set; }

        public Tiempo? Tiempo { get; set; }


    }

    public class TurnoHistorico:Turno{
        public string NombreSolicitante { get; set; }
    }
}