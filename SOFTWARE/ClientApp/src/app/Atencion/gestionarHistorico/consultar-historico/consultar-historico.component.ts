import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorIntl } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Turno, TurnoHistorico } from 'src/app/Modelo/turno';
import { TurnoService } from 'src/app/servicios/turno.service';

@Component({
  selector: 'app-consultar-historico',
  templateUrl: './consultar-historico.component.html',
  styleUrls: ['./consultar-historico.component.css']
})

export class ConsultarHistoricoComponent implements AfterViewInit,OnInit {

  dataSource= new MatTableDataSource<TurnoHistorico>();
  turnos:TurnoHistorico[];
  loading:boolean;
  displayedColumns: string[] = ['numero','identificacion del usuario','nombre', 'motivo', 'atencion', 'Descripcion Operacion', 'editar'];

  @ViewChild(MatPaginator) paginator: MatPaginator;


  constructor(private turnoservice: TurnoService) { }

  ngOnInit(): void {
    this.obtenerTurno();
  }

  ngAfterViewInit() {
  }

  obtenerTurno() {
    this.turnoservice.getHistorico("").subscribe(result=>{this.turnos=result;
      this.dataSource = new MatTableDataSource(this.turnos);
      this.dataSource.paginator = this.paginator;
      this.paginator._intl.itemsPerPageLabel = "Elementos por pagina";
    }
    );
  }

  filtrar(event: Event) {
    const filtro = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filtro.trim().toLowerCase();
  }

}
