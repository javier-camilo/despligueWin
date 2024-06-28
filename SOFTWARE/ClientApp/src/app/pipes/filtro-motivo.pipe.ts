import { Pipe, PipeTransform } from '@angular/core';
import { Motivo } from '../Modelo/motivo';

@Pipe({
  name: 'filtroMotivo'
})
export class FiltroMotivoPipe implements PipeTransform {

  transform(motivos:Motivo[],searchText:string): Motivo[] {

    if(searchText==null)return motivos;

    return motivos.filter(p =>
      p.nombre.toLowerCase()
     .indexOf(searchText.toLowerCase()) !== -1);
    
  }

}
