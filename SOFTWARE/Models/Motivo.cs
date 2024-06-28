
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace SOFTWARE.Models
{
    public class Motivo
    {


        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }

        [Required(ErrorMessage = "el nombre es requerido")]
        public string? Nombre { get; set; }

        
        [Required(ErrorMessage="se necesita la descripcion del motivo")]
        public string? Descripcion { get; set; }
        
    }
}