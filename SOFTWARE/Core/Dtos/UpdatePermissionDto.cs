using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace SOFTWARE.Core.Dtos
{
    public class UpdatePermissionDto
    {
        
        [Required(ErrorMessage = "UserName es requerido")]
        public string UserName { get; set; }

    }

}