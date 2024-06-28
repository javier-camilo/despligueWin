import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Turno } from 'src/app/Modelo/turno';
import { TurnoService } from 'src/app/servicios/turno.service';

@Component({
  selector: 'app-cola-atencion',
  templateUrl: './cola-atencion.component.html',
  styleUrls: ['./cola-atencion.component.css']
})
export class ColaAtencionComponent implements OnInit {

  turnoPrimero: number;
  dataSource:any;
  turnos:Turno[];
  loading:boolean;
  displayedColumns: string[] = ['numero', 'motivo', 'atencion', 'Descripcion Operacion','Horario','editar'];

  constructor(private turnoservice:TurnoService) { }

  ngOnInit(): void {
    this.loading=true;
    this.turnoservice.get("").subscribe(result=>{this.turnos=result; this.loading=false;
      this.dataSource = new MatTableDataSource(this.turnos);
    }
      );
  }
  

  filtrar(event: Event) {
    const filtro = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filtro.trim().toLowerCase();
  }


}
