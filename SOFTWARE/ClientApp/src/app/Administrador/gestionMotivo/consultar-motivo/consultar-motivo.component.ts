import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Motivo } from 'src/app/Modelo/motivo';
import { MotivoService } from 'src/app/servicios/motivo.service';

@Component({
  selector: 'app-consultar-motivo',
  templateUrl: './consultar-motivo.component.html',
  styleUrls: ['./consultar-motivo.component.css']
})
export class ConsultarMotivoComponent implements OnInit {



  dataSource:any;
  motivos:Motivo[];
  loading:boolean;
  displayedColumns: string[] = ['nombre', 'descripcion', 'editar/eliminar'];

  constructor(private motivoService:MotivoService) { }

  ngOnInit(): void {
    this.loading=true;
    this.motivoService.get("").subscribe(result=>{this.motivos=result; this.loading=false;
      this.dataSource = new MatTableDataSource(this.motivos);}
      );
  }

  filtrar(event: Event) {
    const filtro = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filtro.trim().toLowerCase();
  }


}
