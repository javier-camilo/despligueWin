import { Pipe, PipeTransform } from '@angular/core';
import { Poblacion } from '../Modelo/poblacion';

@Pipe({
  name: 'filtroEdad'
})
export class FiltroEdadPipe implements PipeTransform {

  transform(poblacion:Poblacion[],searchText:string): Poblacion[] {

    if(searchText==null)return poblacion;

    return poblacion.filter(p =>

      p.nombre.toLowerCase()
     .indexOf(searchText.toLowerCase()) !== -1
     
     );

    
  }

}
