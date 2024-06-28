import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Register, UpdatePermission } from 'src/app/Modelo/register';
import { DialogoConfirmacionComponent } from 'src/app/dialogo-confirmacion/dialogo-confirmacion.component';
import { LoginService } from 'src/app/servicios/login.service';

@Component({
  selector: 'app-registro-admin',
  templateUrl: './registro-admin.component.html',
  styleUrls: ['./registro-admin.component.css']
})
export class RegistroAdminComponent implements OnInit {

  protected operacion: string;
  protected hide = true;
  protected register: Register;
  protected updatePermission: UpdatePermission;

  constructor(private loginService:LoginService,private dialog:MatDialog, private router:Router) { }

  ngOnInit(): void {
    this.operacion = "0";
    this.register = new Register();
    this.updatePermission = new UpdatePermission();
  }

   registrar():void{


    let dialogo= this.dialog.open(DialogoConfirmacionComponent, {data:{name:"Advertencia", descripcion:"¿Estan todo los datos correctos?"} } );

    dialogo.afterClosed().subscribe(result => {
      if(result=="true"){
        this.loginService.registrar(this.register).subscribe(result =>
        {
          if (result != null) {
            this.asginarDatos();
          }
        }
      );

      }
    });




   }


  asginarDatos() {

      if (this.operacion == "1") {
        this.volverAdministrador();
      } else if(this.operacion == "2"){
        this.volverOwner();
      }

  }

  volverOwner() {
      this.updatePermission.userName = this.register.userName;
      this.loginService.makeOwner(this.updatePermission," ").subscribe();
  }

  volverAdministrador() {
      this.updatePermission.userName = this.register.userName;
      this.loginService.makeAdmin(this.updatePermission," ").subscribe();
  }

}
