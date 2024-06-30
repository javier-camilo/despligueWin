
import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { HandleHttpErrorService } from '../@base/handle-http-error-service.service';
import { Tiempo,HorarioInputModel } from '../Modelo/tiempo';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  }


@Injectable({
  providedIn: 'root'
})



export class TiempoService {

  baseUrl: string;

  constructor(private http: HttpClient,@Inject('BASE_URL') baseUrl: string,
    private handleErrorService: HandleHttpErrorService) {
      this.baseUrl=baseUrl;
  }

  getTiempo(operacion:string): Observable<Tiempo[]> {
    return this.http.get<Tiempo[]>(this.baseUrl + 'api/Tiempo/listadoTiempo')
        .pipe(
            tap(_ =>
              {
              if(operacion==="TiempoComponent")
              this.handleErrorService.log('Datos del tiempo recibido');
              }
          ),
            catchError(this.handleErrorService.handleError<Tiempo[]>('Consulta tiempo', undefined))
        );
  }

  getTiempoAdministrador(operacion:string): Observable<Tiempo[]> {
    return this.http.get<Tiempo[]>(this.baseUrl + 'api/Tiempo/listadoTiempoAdminsitrador')
        .pipe(
            tap(_ =>
              {
              if(operacion==="TiempoComponent")
              this.handleErrorService.log('Datos del tiempo recibido');
              }
          ),
            catchError(this.handleErrorService.handleError<Tiempo[]>('Consulta tiempo', undefined))
        );
  }

  post(horarioInput:HorarioInputModel): Observable<Tiempo[]> {

    return this.http.post<Tiempo[]>(this.baseUrl + 'api/Tiempo', horarioInput)
        .pipe(
            tap(_ => this.handleErrorService.log('Guardado con exito')),
            catchError(this.handleErrorService.handleError<Tiempo[]>('Registrar tiempo',undefined))
        );
  }

  delete(tiempo: Tiempo | string): Observable<void> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.delete<void>(`${this.baseUrl}api/tiempo/por-fecha`, { headers: headers, body: tiempo })
      .pipe(
        tap(_ => this.handleErrorService.log("Horario eliminado")),
        catchError(this.handleErrorService.handleError<void>('Eliminar Horario'))
      );
  }
  
}
