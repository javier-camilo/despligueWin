import { Component, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TurnoService } from '../servicios/turno.service';
import { MatTableDataSource } from '@angular/material/table';
import { Turno } from '../Modelo/turno';

@Component({
  selector: 'app-fetch-data',
  templateUrl: './fetch-data.component.html'
})
export class FetchDataComponent {


  dataSource:any;
  turnos:Turno[];
  loading:boolean;
  displayedColumns: string[] = ['numero', 'motivo', 'atencion', 'Descripcion Operacion','Horario'];

  constructor(private turnoservice:TurnoService) { }

  ngOnInit(): void {
    this.loading=true;
    this.turnoservice.get("turnoComponent").subscribe(result=>{this.turnos=result; this.loading=false;
      this.dataSource = new MatTableDataSource(this.turnos);}
      );
  }

  filtrar(event: Event) {
    const filtro = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filtro.trim().toLowerCase();
    let turnos = new Turno();
  }

}
