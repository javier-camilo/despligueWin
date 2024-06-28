import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/servicios/login.service';
import { Register } from '../../Modelo/register';
import { MatDialog } from '@angular/material/dialog';
import { DialogoConfirmacionComponent } from 'src/app/dialogo-confirmacion/dialogo-confirmacion.component';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  checked = false;
  hide = true;
  register:Register;

  constructor(private loginService:LoginService,private dialog:MatDialog, private router:Router) { }

  ngOnInit(): void {
    this.register=new Register();
  }

  registrar(){


    let dialogo= this.dialog.open(DialogoConfirmacionComponent, {data:{name:"Advertencia", descripcion:"¿Estan todo los datos correctos?"} } );

    dialogo.afterClosed().subscribe(result => {
      if(result=="true"){
        this.loginService.registrar(this.register).subscribe(result =>
        {

        }
      );

      }
    });


  }

}
