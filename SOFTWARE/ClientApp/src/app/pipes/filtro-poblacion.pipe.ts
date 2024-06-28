import { Pipe, PipeTransform } from '@angular/core';
import { Solicitante } from '../Modelo/solicitante';

@Pipe({
  name: 'filtroPoblacion'
})
export class FiltroPoblacionPipe implements PipeTransform {

  transform(solicitantes:Solicitante[],searchText:string): Solicitante[] {

    if(searchText==null)return solicitantes;

    return solicitantes.filter(p =>

      p.identificacion.toLowerCase()
     .indexOf(searchText.toLowerCase()) !== -1 ||

     p.nombre.toLowerCase()
    .indexOf(searchText.toLowerCase()) !== -1  );


    
  }

}
