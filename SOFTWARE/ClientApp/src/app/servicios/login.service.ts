import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { HandleHttpErrorService } from '../@base/handle-http-error-service.service';
import { Motivo } from '../Modelo/motivo';
import { Login } from '../Modelo/login';
import { Router } from '@angular/router';
import { Register, UserVista, UpdatePermission } from '../Modelo/register';



const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};


@Injectable({
  providedIn: 'root'
})

export class LoginService {

  baseUrl: string;

  constructor(private http: HttpClient,@Inject('BASE_URL') baseUrl: string,
    private handleErrorService: HandleHttpErrorService, private router: Router) {

    this.baseUrl = baseUrl;
  }


  makeAdmin(permission: UpdatePermission, llamado?: string): Observable<UpdatePermission> {
    return this.http.post<UpdatePermission>(this.baseUrl + 'api/Auth/make-admin', permission)
      .pipe(
        tap((res: any) => {
          if (llamado == null) {

            this.handleErrorService.log("se actualizo los permisos de usuario a contratista");

          }

        }

        ),
        catchError(this.handleErrorService.handleError<UpdatePermission>('usuario invalido', undefined))
      );
  }

  removeAdmin(permission: UpdatePermission): Observable<UpdatePermission> {
    return this.http.post<UpdatePermission>(this.baseUrl + 'api/Auth/remove-admin', permission)
      .pipe(
        tap((res: any) => {

          this.handleErrorService.log("se actualizo los permisos de usuario y se le retiro el rol");

        }

        ),
        catchError(this.handleErrorService.handleError<UpdatePermission>('usuario invalido', undefined))
      );
  }

  makeOwner(permission: UpdatePermission, llamado?: string): Observable<UpdatePermission> {
    return this.http.post<UpdatePermission>(this.baseUrl + 'api/Auth/make-owner', permission)
      .pipe(
        tap((res: any) => {
          if (llamado == null) {
            this.handleErrorService.log("se actualizo los permisos de usuario a Administrador");
          }
        }

        ),
        catchError(this.handleErrorService.handleError<UpdatePermission>('usuario invalido', undefined))
      );
  }

  removeOwner(permission: UpdatePermission): Observable<UpdatePermission> {
    return this.http.post<UpdatePermission>(this.baseUrl + 'api/Auth/remove-owner', permission)
      .pipe(
        tap((res: any) => {
          this.handleErrorService.log("se le revoco el permiso de administrador de la aplicacion");
        }

        ),
        catchError(this.handleErrorService.handleError<UpdatePermission>('usuario invalido', undefined))
      );
  }

  getUserID(id: string | null, operacionLLamado?:string): Observable<UserVista> {
    const url = `${this.baseUrl + 'api/Auth/traerUsuario'}/${id}`;
      return this.http.get<UserVista>(url, httpOptions)
      .pipe(
        tap(_ =>
          {
              if(operacionLLamado!=null){

                  this.handleErrorService.log('se consulto el usuario con = '+ id)

              }

          }
          ),
        catchError(this.handleErrorService.handleError<UserVista>('error al consultar usuario ', undefined))
      );
  }

  post(login:Login): Observable<string> {
    return this.http.post<string>(this.baseUrl + 'api/Auth/login', login)
        .pipe(
            tap((res:any)=>
            {
                this.handleErrorService.log("se incio sesion correctamente");

            }

              ),
            catchError(this.handleErrorService.handleError<string>('usuario o contraseña invalidos',undefined))
        );
  }

  registrar(register:Register, operacionLLamado?:string): Observable<Register> {
    return this.http.post<Register>(this.baseUrl + 'api/Auth/register', register)
        .pipe(
          tap((res: any) => {

            if (operacionLLamado == null) {
                  this.handleErrorService.log("el usuario se registro correctamente");
                  this.router.navigateByUrl('/home');
            }
              }),
            catchError(this.handleErrorService.handleError<Register>('usuario o contraseña invalidos',undefined))
        );
  }

  IsLoggedIn(){
    return localStorage.getItem('token')!=null;
  }

  GetToken(){
    return localStorage.getItem('token')||'';
   }

  logoutUser(){
    localStorage.removeItem('token');
  }

  getDatosToken() {

    var loggintoken = localStorage.getItem('token') || '';
    var _extractedtoken = loggintoken.split('.')[1];
    var _atobdata = atob(_extractedtoken);
    var _finaldata = JSON.parse(_atobdata);

    return _finaldata;

  }

  HaveAccessAdmin() {

    var _finaldata = this.getDatosToken();
    let roles: string[] = [];
    roles = _finaldata.rol;
    let rol = "";

    if (Array.isArray(roles)) {

      roles.forEach(function (value) {
        if (value == 'OWNER' || value == 'ADMIN') {
          rol = value;
        }
      });

    }

    if (rol == "OWNER" || rol == 'ADMIN') {
      return true;
    } else {
      return false;
    }


  }

  HaveAccessOwner() {

    var _finaldata = this.getDatosToken();
    let roles: string[] = [];
    roles = _finaldata.rol;
    let rol = "";

    if (Array.isArray(roles)) {

      roles.forEach(function (value) {
        if (value == 'OWNER') {
          rol = value;
        }
      });

    }

    if (rol == "OWNER") {
      return true;
    } else {
      return false;
    }


  }

  GetInformacionUsuario() {

    var _finaldata = this.getDatosToken();

    let datosUsuario = new Register();

    datosUsuario.identificacion = _finaldata.Identificacion;
    datosUsuario.nombre = _finaldata.Nombre;
    datosUsuario.apellido = _finaldata.Apellido;
    datosUsuario.telefono =_finaldata.Telefono;
    datosUsuario.email = _finaldata.Email;
    datosUsuario.userName = _finaldata.UserName;

    return datosUsuario;
  }


}
