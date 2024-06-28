using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace SOFTWARE.Core.Dtos
{
    public class LoginDto
    {
        
        [Required(ErrorMessage = "usuario es requerido")]
        public string UserName { get; set; }

        [Required(ErrorMessage = "contraseña es requerido")]
        public string Password { get; set; }

    }
}