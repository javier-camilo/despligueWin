import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { UserVista } from 'src/app/Modelo/register';
import { DialogoConfirmacionComponent } from 'src/app/dialogo-confirmacion/dialogo-confirmacion.component';
import { LoginService } from 'src/app/servicios/login.service';
import { UpdatePermission } from '../../../Modelo/register';

@Component({
  selector: 'app-roles',
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.css']
})
export class RolesComponent implements OnInit {


  protected datosUsuario: UserVista;
  protected identificacion: string;
  protected SeEncontro: boolean;
  protected updatePermission: UpdatePermission;
  protected operacion:string;

  constructor(private loginService: LoginService,public dialogo: MatDialog) {
  }

  ngOnInit(): void {
    this.datosUsuario = new UserVista();
    this.identificacion = "";
    this.SeEncontro = false;
    this.updatePermission = new UpdatePermission();
    this.operacion = "";
  }

  buscar() {
    this.loginService.getUserID(this.identificacion).subscribe(result =>
    {
      if (result != null) {
        this.datosUsuario = result;
        this.SeEncontro = true;
      }
    }

    );
  }



  volverAdministrador(respuesta: string) {

    if (respuesta == "true") {
      this.updatePermission.userName = this.datosUsuario.userName;
      this.loginService.makeAdmin(this.updatePermission).subscribe();
    }

  }

  removerAdministrador(respuesta: string) {

    if (respuesta == "true") {
      this.updatePermission.userName = this.datosUsuario.userName;
      this.loginService.removeAdmin(this.updatePermission).subscribe();
    }

  }

  volverOwner(respuesta: string) {

    if (respuesta == "true") {

      this.updatePermission.userName = this.datosUsuario.userName;
      this.loginService.makeOwner(this.updatePermission).subscribe();

    }

  }

  removerOwner(respuesta: string) {

    if (respuesta == "true") {

      this.updatePermission.userName = this.datosUsuario.userName;
      this.loginService.removeOwner(this.updatePermission).subscribe();

    }

  }

  confirmacion(operacion:string) {

    let respuesta;
    let ref = this.dialogo.open(DialogoConfirmacionComponent, {data: {name:"Guardar", descripcion:"¿desea Registrar Los Datos?"}});

    ref.afterClosed().subscribe(result => {

      respuesta = result;

      if (operacion == "1") {
        this.volverAdministrador(respuesta);
      } else if(operacion == "2"){
        this.volverOwner(respuesta);
      }

    })
  }


  confirmacionEliminacion(operacion: string) {

    let respuesta;
    let ref = this.dialogo.open(DialogoConfirmacionComponent, {data: {name:"Eliminar", descripcion:"¿Deseas eliminar el rol?"}});

    ref.afterClosed().subscribe(result => {

      respuesta = result;

      if (operacion == "1") {
        this.removerAdministrador(respuesta);
      } else if(operacion == "2"){
        this.removerOwner(respuesta);
      }

    })
  }


}
