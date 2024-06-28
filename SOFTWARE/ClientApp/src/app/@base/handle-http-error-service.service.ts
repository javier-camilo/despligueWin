import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { DialogoConfirmacionComponent } from '../dialogo-confirmacion/dialogo-confirmacion.component';


@Injectable({
  providedIn: 'root'
})


export class HandleHttpErrorService {


  constructor(private dialog:MatDialog) { }

  public handleError<T>(operation = 'operation', result?:T) {
    return (error: any): Observable<T> => {

     if (error.status == '500') {
        this.mostrarError500(error);
     }
     if (error.status == '400') {
       this.mostrarError400(error);
     }
    if (error.status == '401') {
      this.log("Credenciales invalidas");
    }
    if (error.status == '403') {
      this.log("no tines autorizacion para acceder a este recurso");
    }
    if (error.status == '404') {
      this.log("no se encontro la informacion");
    }

      return of(result as T);
    };
  }

  public log(message: string) {
    this.dialog.open(DialogoConfirmacionComponent, {data: {name:"Señor(a) usuario(a)", descripcion: message, EsMensaje: "true"}});
  }

  private mostrarError500(error: any) {
    console.error(error);
  }

  private mostrarError400(error: any) {

    console.error(error);
    let contadorValidaciones: number = 0;
    let mensajeValidaciones: string =
      `Señor(a) usuario(a), se han presentado algunos errores de validación, por favor revíselos y vuelva a realizar la operación.<br/><br/>`;

    for (const prop in error.error.errors) {
      contadorValidaciones++;
      mensajeValidaciones += `<strong>${contadorValidaciones}. ${prop}:</strong>`;

      error.error.errors[prop].forEach((element: any) => {
        mensajeValidaciones += `<br/> - ${element}`;
      });

      mensajeValidaciones += `<br/>`;
    }

    this.dialog.open(DialogoConfirmacionComponent, {data: {name:"Señor Usuario, hubo un error", descripcion: mensajeValidaciones, EsMensaje: "true"}});
    console.log(error);
  }


}
