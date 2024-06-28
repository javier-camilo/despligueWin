using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SOFTWARE.Models
{
    public class Reporte
    {

        public Reporte(){

        }

        public Reporte(string name, int value) 
        {
            this.Name = name;
            this.Value = value;
   
        }
        
        public string Name { get; set; }
        public int Value { get; set; }    
    }
}