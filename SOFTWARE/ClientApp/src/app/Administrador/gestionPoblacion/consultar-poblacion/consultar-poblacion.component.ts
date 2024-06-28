import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Poblacion } from 'src/app/Modelo/poblacion';
import { PoblacionServiceService } from 'src/app/servicios/poblacion-service.service';

@Component({
  selector: 'app-consultar-poblacion',
  templateUrl: './consultar-poblacion.component.html',
  styleUrls: ['./consultar-poblacion.component.css']
})
export class ConsultarPoblacionComponent implements OnInit {

  dataSource:any;
  poblacion:Poblacion[];
  loading:boolean;
  displayedColumns: string[] = ['nombre', 'prioridad', 'editar/eliminar'];

  constructor(private poblacionService:PoblacionServiceService) { }

  ngOnInit(): void {

    this.loading=true;
    this.poblacionService.get("").subscribe(result=>{this.poblacion=result; this.loading=false;
      this.dataSource = new MatTableDataSource(this.poblacion)}
      );
  }


  filtrar(event: Event) {
    const filtro = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filtro.trim().toLowerCase();
  }

}
