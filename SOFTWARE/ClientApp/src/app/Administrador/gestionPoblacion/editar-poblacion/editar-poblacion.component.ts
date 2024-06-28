import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { Poblacion } from 'src/app/Modelo/poblacion';
import { DialogoConfirmacionComponent } from 'src/app/dialogo-confirmacion/dialogo-confirmacion.component';
import { MotivoService } from 'src/app/servicios/motivo.service';
import { PoblacionServiceService } from 'src/app/servicios/poblacion-service.service';

@Component({
  selector: 'app-editar-poblacion',
  templateUrl: './editar-poblacion.component.html',
  styleUrls: ['./editar-poblacion.component.css']
})
export class EditarPoblacionComponent implements OnInit {

  poblacion:Poblacion;
  codigo:string;

  constructor(private poblacionservicio:PoblacionServiceService,private dialog:MatDialog,private rutaActiva: ActivatedRoute) { }

  ngOnInit(): void {

    this.poblacion=new Poblacion();

    const id = this.rutaActiva.snapshot.params.codigoPoblacion;

    this.codigo=id;

    this.poblacionservicio.getId(id).subscribe(resul => {

      this.poblacion=resul;

      this.poblacion != null ? null : this.inicializarError();

    });

  }

  inicializarError(){

    this.poblacion=new Poblacion();

    this.poblacion.nombre="..";
    this.poblacion.prioridad=0;

  }


  confirmar(operacion:string){

    let dialogo= this.dialog.open(DialogoConfirmacionComponent, {data:{name:"Advertencia", descripcion:"¿esta seguro de realizar esta accion?"} } );

    dialogo.afterClosed().subscribe(result => {
        if (operacion=="1") {
          this.update(result);
        } else if(operacion=="2"){
          this.delete(result);
        }
      }

    );

  }

  delete(result: any) {
    if(result=="true"){
      this.poblacionservicio.delete(this.poblacion).subscribe();
      this.inicializarError();
    }
  }

  update(result: any) {
    if(result=="true"){
      this.poblacionservicio.put(this.poblacion).subscribe();
    }
  }




}
