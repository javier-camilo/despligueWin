using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Internal;
using SOFTWARE.Core.OtherObjects;
using SOFTWARE.Models;

namespace SOFTWARE.Servicios
{
    public class UserSeed
    {

        public ApplicationUser owner()
        {

           ApplicationUser userOwner = new ApplicationUser()
            {
                Identificacion = "1005309814",
                Nombre = "Admin",
                Apellido = "Admin",
                PhoneNumber = "3114045021",
                Email = "admin@gmail.com",
                UserName = "Administrador",
                NormalizedUserName = "ADMINISTRADOR",
                SecurityStamp = Guid.NewGuid().ToString(),
            };
            return userOwner;
        }

        public ApplicationUser admin(){

            ApplicationUser userContratista = new ApplicationUser()
            {
                Identificacion = "1005309815",
                Nombre = "Contratista",
                Apellido = "Contratista",
                PhoneNumber = "3114045021",
                Email = "contratista@gmail.com",
                UserName = "Contratista",
                NormalizedUserName = "CONTRATISTA",
                SecurityStamp = Guid.NewGuid().ToString(),
            };

            return userContratista;
        }


        public ApplicationUser user(){

            ApplicationUser user = new ApplicationUser()
            {
                Identificacion = "1004308816",
                Nombre = "User",
                Apellido = "User",
                PhoneNumber = "3218719166",
                Email = "user@gmail.com",
                UserName = "User",
                NormalizedUserName = "USER",
                SecurityStamp = Guid.NewGuid().ToString(),
            };

            return user;
        }






    }
}