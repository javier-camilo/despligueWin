

import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { HandleHttpErrorService } from '../@base/handle-http-error-service.service';
import { Solicitante } from '../Modelo/solicitante';
import { Turno, TurnoHistorico } from '../Modelo/turno';
import { ReporteTurno } from '../Modelo/reporte';



const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
}



@Injectable({
  providedIn: 'root'
})

export class TurnoService {

  baseUrl: string;

  constructor(private http: HttpClient,@Inject('BASE_URL') baseUrl: string,
    private handleErrorService: HandleHttpErrorService) {
      this.baseUrl="https://localhost:7240/";

  }


  get(operacion:string): Observable<Turno[]> {
    return this.http.get<Turno[]>(this.baseUrl + 'api/Turno')
        .pipe(
            tap(_ =>
              {
              if(operacion==="turnoComponent")
              this.handleErrorService.log('Datos de los turnos recibidos');
              }
          ),
            catchError(this.handleErrorService.handleError<Turno[]>('Consulta solicitante', undefined))
        );
  }

    getHistorico(operacion:string): Observable<TurnoHistorico[]> {
    return this.http.get<TurnoHistorico[]>(this.baseUrl + 'api/Turno/listadoTurno')
        .pipe(
            tap(_ =>
              {
              if(operacion==="turnoComponent")
              this.handleErrorService.log('Datos del historico recibido');
              }
          ),
            catchError(this.handleErrorService.handleError<TurnoHistorico[]>('Consulta solicitante', undefined))
        );
  }

  post(turno:Turno): Observable<Turno> {

    return this.http.post<Turno>(this.baseUrl + 'api/Turno', turno)
        .pipe(
            tap(_ => this.handleErrorService.log('turno registrado con exito')),
            catchError(this.handleErrorService.handleError<Turno>('Registrar turno',undefined))
    );

  }


  getId(id: string, operacionLLamado?:string): Observable<Turno> {
    const url = `${this.baseUrl + 'api/Turno'}/${id}`;
      return this.http.get<Turno>(url, httpOptions)
      .pipe(
        tap(_ =>

          {

              if(operacionLLamado==null){

                  this.handleErrorService.log('se consulto el turno = '+ id)

              }

          }

          ),
        catchError(this.handleErrorService.handleError<Turno>('Buscar motivo', undefined))
      );
  }

  getTurnoUsuario(id: string | null, operacionLLamado?:string): Observable<Turno> {
    const url = `${this.baseUrl + 'api/Turno/consultarTurnoUsuario'}/${id}`;
      return this.http.get<Turno>(url, httpOptions)
      .pipe(
        tap(_ =>

          {

              if(operacionLLamado==null){

                  this.handleErrorService.log('se consulto el turno = '+ id)

              }

          }

          ),
        catchError(this.handleErrorService.handleError<Turno>('Buscar motivo', undefined))
      );
  }

  put(turno: Turno): Observable<any> {
    const url = `${this.baseUrl}api/Turno/${turno.numero}`;
    return this.http.put(url, turno,  {responseType: 'text'} )
    .pipe(
      tap(_=> this.handleErrorService.log("se edito el turno correctamente")),
      catchError(this.handleErrorService.handleError<any>('Editar turno'))
    );
  }


  getReporte(operacion:string): Observable<ReporteTurno[]> {
    return this.http.get<ReporteTurno[]>(this.baseUrl + 'api/Turno/reporteTurno')
        .pipe(
            tap(_ =>
            {

              if(operacion==="reporte")
              this.handleErrorService.log('Datos de reportes consultados');

            }
          ),
            catchError(this.handleErrorService.handleError<ReporteTurno[]>('Consulta solicitante', undefined))
        );
  }

  getReporteContratista(identificacion: string | null, operacionLLamado?:string): Observable<ReporteTurno[]> {
    const url = `${this.baseUrl + 'api/Turno/reporteContratista'}/${identificacion}`;
      return this.http.get<ReporteTurno[]>(url, httpOptions)
      .pipe(
        tap(_ =>

          {

              if(operacionLLamado==null){

                  this.handleErrorService.log('se consultaron los reportes = '+ identificacion)

              }

          }

          ),
        catchError(this.handleErrorService.handleError<ReporteTurno[]>('Buscar reporte', undefined))
      );
  }


}
