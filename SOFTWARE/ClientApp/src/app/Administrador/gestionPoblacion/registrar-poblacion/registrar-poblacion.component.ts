import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Poblacion } from 'src/app/Modelo/poblacion';
import { DialogoConfirmacionComponent } from 'src/app/dialogo-confirmacion/dialogo-confirmacion.component';
import { PoblacionServiceService } from 'src/app/servicios/poblacion-service.service';

@Component({
  selector: 'app-registrar-poblacion',
  templateUrl: './registrar-poblacion.component.html',
  styleUrls: ['./registrar-poblacion.component.css']
})
export class RegistrarPoblacionComponent implements OnInit {

  respuesta:string;
  poblacion:Poblacion;

  constructor(private poblacionService:PoblacionServiceService, private dialog:MatDialog) { }

  ngOnInit(): void {
    this.poblacion=new Poblacion();
  }

  guardar(): void{
    
      
    let ref = this.dialog.open(DialogoConfirmacionComponent, {data: {name:"Guardar", descripcion:"¿desea Registrar Los Datos?"}});

      ref.afterClosed().subscribe(result => {
        this.respuesta=result;
        this.add(this.respuesta);
      })

  }


  
  add(resultado:string){

    
    if (resultado=="true") {

      this.poblacionService.post(this.poblacion).subscribe();
      this.limpiar();
    } 


  }


  limpiar(){
    
    this.poblacion.nombre="";
    
    this.poblacion.prioridad=0;
  }



}
