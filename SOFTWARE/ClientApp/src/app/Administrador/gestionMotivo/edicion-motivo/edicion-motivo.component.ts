import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { Motivo } from 'src/app/Modelo/motivo';
import { DialogoConfirmacionComponent } from 'src/app/dialogo-confirmacion/dialogo-confirmacion.component';
import { MotivoService } from 'src/app/servicios/motivo.service';

@Component({
  selector: 'app-edicion-motivo',
  templateUrl: './edicion-motivo.component.html',
  styleUrls: ['./edicion-motivo.component.css']
})
export class EdicionMotivoComponent implements OnInit {

  
  motivo:Motivo;
  codigo:string;

  constructor(private rutaActiva: ActivatedRoute,private motivoservicio:MotivoService, private dialog:MatDialog) { }

  ngOnInit(): void {
    
    this.motivo=new Motivo();

    const id = this.rutaActiva.snapshot.params.codigoMotivo;
    this.codigo=id;
    this.motivoservicio.getId(id).subscribe(resul => {
      
      this.motivo=resul;
      
      this.motivo != null ? null : this.inicializarError();

    });

  }

  
  inicializarError(){

    this.motivo=new Motivo();

    this.motivo.nombre="..";
    this.motivo.descripcion="..";

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
      this.motivoservicio.delete(this.motivo).subscribe();
    }
  }

  update(result: any) {
    if(result=="true"){
      this.motivoservicio.put(this.motivo).subscribe(); 
    }
  }




}
